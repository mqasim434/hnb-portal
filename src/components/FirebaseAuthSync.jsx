import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { doc, onSnapshot } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { ACCOUNT_STATUS } from '../constants/roles'
import { auth, firestore } from '../firebase/config'
import { fetchUserProfile } from '../lib/auth/authService'
import {
  clearAuth,
  setAccountStatus,
  setAuthLoading,
  setProfile,
  setRole,
  setUser,
} from '../store/slices/authSlice'

/**
 * Auth state from Firebase Auth + Firestore profile (Spark plan — no Cloud Functions).
 * Role/status live in Firestore; admin updates apply after re-login or token refresh.
 */
export default function FirebaseAuthSync() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!auth) {
      dispatch(clearAuth())
      return
    }

    let profileUnsubscribe = null

    dispatch(setAuthLoading(true))
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (profileUnsubscribe) {
        profileUnsubscribe()
        profileUnsubscribe = null
      }

      if (!firebaseUser) {
        dispatch(clearAuth())
        dispatch(setAuthLoading(false))
        return
      }

      dispatch(
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email ?? null,
          displayName: firebaseUser.displayName ?? null,
        }),
      )

      const applyProfile = (profile) => {
        dispatch(setProfile(profile))
        dispatch(setRole(profile?.role ?? null))
        dispatch(setAccountStatus(profile?.accountStatus ?? ACCOUNT_STATUS.PENDING))
      }

      try {
        const profile = await fetchUserProfile(firebaseUser.uid)
        applyProfile(profile)
      } catch {
        applyProfile(null)
      }

      if (firestore) {
        profileUnsubscribe = onSnapshot(doc(firestore, 'users', firebaseUser.uid), (snap) => {
          if (!snap.exists()) return
          const d = snap.data()
          applyProfile({
            uid: firebaseUser.uid,
            email: d.email ?? null,
            displayName: d.displayName ?? null,
            role: d.role ?? null,
            accountStatus: d.accountStatus ?? ACCOUNT_STATUS.PENDING,
            intendedRole: d.intendedRole ?? null,
          })
        })
      }

      dispatch(setAuthLoading(false))
    })

    return () => {
      if (profileUnsubscribe) profileUnsubscribe()
      unsubscribe()
    }
  }, [dispatch])

  return null
}
