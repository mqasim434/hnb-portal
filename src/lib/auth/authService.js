import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { doc, getDoc, getDocFromServer, serverTimestamp, setDoc } from 'firebase/firestore'
import { ACCOUNT_STATUS, ROLES } from '../../constants/roles'
import { auth, firestore } from '../../firebase/config'
import { mapAuthError } from './authErrors'
import { linkOnboardingApplicationToUser } from '../onboarding/applications'

function assertAuthReady() {
  if (!auth || !firestore) {
    throw new Error(
      'Firebase is niet geconfigureerd. Vul VITE_FIREBASE_* in uw .env-bestand in.',
    )
  }
  return { auth, firestore }
}

/**
 * @param {{ email: string, password: string, displayName: string }} params
 */
export async function registerFreelancerAccount({ email, displayName, password }) {
  const { auth: a, firestore: db } = assertAuthReady()

  const cred = await createUserWithEmailAndPassword(a, email.trim(), password)
  if (displayName.trim()) {
    await updateProfile(cred.user, { displayName: displayName.trim() })
  }

  await setDoc(doc(db, 'users', cred.user.uid), {
    email: email.trim().toLowerCase(),
    displayName: displayName.trim(),
    role: null,
    accountStatus: ACCOUNT_STATUS.PENDING,
    intendedRole: ROLES.FREELANCER,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  try {
    await linkOnboardingApplicationToUser(cred.user.uid, email)
  } catch {
    // Non-blocking — account still created if no matching application exists.
  }

  await signOut(a)
  return cred.user.uid
}

/**
 * @param {{ email: string, password: string }} params
 */
export async function signInWithEmail({ email, password }) {
  const { auth: a } = assertAuthReady()
  const cred = await signInWithEmailAndPassword(a, email.trim(), password)
  await cred.user.getIdToken(true)
  return cred.user
}

/** @param {string} email */
export async function sendPasswordReset(email) {
  const { auth: a } = assertAuthReady()
  await sendPasswordResetEmail(a, email.trim())
}

export async function signOutUser() {
  if (!auth) return
  await signOut(auth)
}

/**
 * @param {string} uid
 * @param {{ preferServer?: boolean }} [options]
 * @returns {Promise<import('../../store/slices/authSlice').UserProfile | null>}
 */
export async function fetchUserProfile(uid, options = {}) {
  if (!firestore) return null
  const userRef = doc(firestore, 'users', uid)
  let snap

  if (options.preferServer) {
    try {
      snap = await getDocFromServer(userRef)
    } catch {
      snap = await getDoc(userRef)
    }
  } else {
    snap = await getDoc(userRef)
  }

  if (!snap.exists()) return null
  const d = snap.data()
  return {
    uid,
    email: d.email ?? null,
    displayName: d.displayName ?? null,
    role: d.role ?? null,
    accountStatus: d.accountStatus ?? ACCOUNT_STATUS.PENDING,
    intendedRole: d.intendedRole ?? null,
  }
}

export { mapAuthError }
