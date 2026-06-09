import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { APPLICATION_STATUS } from '../../constants/assignmentApplications'
import { ASSIGNMENT_STATUS } from '../../constants/assignments'
import { ROLES, ACCOUNT_STATUS } from '../../constants/roles'
import { auth, firestore } from '../../firebase/config'
import { fetchUserProfile } from '../auth/authService'

function assertFirestore() {
  if (!firestore) {
    throw new Error('Firestore is niet beschikbaar.')
  }
  return firestore
}

function assertSignedIn() {
  if (!auth?.currentUser) {
    throw new Error('Je moet ingelogd zijn.')
  }
  return auth.currentUser
}

/** @param {string} id @param {import('firebase/firestore').DocumentData} data */
function mapApplication(id, data) {
  return {
    id,
    assignmentId: data.assignmentId ?? '',
    assignmentTitle: data.assignmentTitle ?? '',
    companyId: data.companyId ?? '',
    companyName: data.companyName ?? '',
    freelancerId: data.freelancerId ?? '',
    freelancerName: data.freelancerName ?? '',
    freelancerEmail: data.freelancerEmail ?? '',
    message: data.message ?? '',
    status: data.status ?? APPLICATION_STATUS.PENDING,
    createdAt: data.createdAt ?? null,
    updatedAt: data.updatedAt ?? null,
  }
}

/**
 * @param {string} freelancerId
 * @returns {Promise<Map<string, ReturnType<typeof mapApplication>>>}
 */
export async function fetchFreelancerApplicationsByAssignment(freelancerId) {
  const db = assertFirestore()
  const snap = await getDocs(
    query(collection(db, 'assignmentApplications'), where('freelancerId', '==', freelancerId)),
  )

  /** @type {Map<string, ReturnType<typeof mapApplication>>} */
  const byAssignment = new Map()
  for (const docSnap of snap.docs) {
    const record = mapApplication(docSnap.id, docSnap.data())
    byAssignment.set(record.assignmentId, record)
  }
  return byAssignment
}

/**
 * @param {{
 *   id: string
 *   companyId: string
 *   companyName?: string
 *   title: string
 * }} assignment
 * @param {{ uid: string, displayName?: string | null, email?: string | null }} freelancer
 * @param {string} [message]
 */
export async function applyToAssignment(assignment, freelancer, message = '') {
  const db = assertFirestore()
  assertSignedIn()

  const profile = await fetchUserProfile(freelancer.uid, { preferServer: true })
  if (!profile || profile.role !== ROLES.FREELANCER || profile.accountStatus !== ACCOUNT_STATUS.ACTIVE) {
    throw new Error(
      'Je account is nog niet actief als freelancer. Log uit en opnieuw in na goedkeuring door H&B.',
    )
  }

  if (!assignment.companyId) {
    throw new Error('Deze opdracht is niet beschikbaar om op te reageren.')
  }

  const assignmentRef = doc(db, 'assignments', assignment.id)
  const assignmentSnap = await getDoc(assignmentRef)
  if (!assignmentSnap.exists()) {
    throw new Error('Opdracht niet gevonden.')
  }

  const assignmentData = assignmentSnap.data()
  if (assignmentData.status !== ASSIGNMENT_STATUS.OPEN) {
    throw new Error('Deze opdracht accepteert geen sollicitaties meer.')
  }

  const companyId =
    typeof assignmentData.companyId === 'string' && assignmentData.companyId.length > 0
      ? assignmentData.companyId
      : assignment.companyId

  if (!companyId) {
    throw new Error('Deze opdracht is niet beschikbaar om op te reageren.')
  }

  const applicationId = `${assignment.id}_${freelancer.uid}`
  const applicationRef = doc(db, 'assignmentApplications', applicationId)
  const existingApplication = await getDoc(applicationRef)
  if (existingApplication.exists()) {
    throw new Error('Je hebt al gesolliciteerd op deze opdracht.')
  }

  const companyName = assignment.companyName ?? assignmentData.companyName ?? ''
  const currentCount =
    typeof assignmentData.applicationCount === 'number' ? assignmentData.applicationCount : 0

  try {
    await setDoc(applicationRef, {
      assignmentId: assignment.id,
      assignmentTitle: assignment.title,
      companyId,
      companyName,
      freelancerId: freelancer.uid,
      freelancerName: freelancer.displayName ?? profile.displayName ?? '',
      freelancerEmail: freelancer.email ?? profile.email ?? '',
      message: message.trim(),
      status: APPLICATION_STATUS.PENDING,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  } catch (err) {
    const code = typeof err === 'object' && err && 'code' in err ? String(err.code) : ''
    if (code === 'permission-denied') {
      throw new Error(
        'Solliciteren mislukt. Controleer of de opdracht nog open is en of je Firebase-account overeenkomt met je profiel in Firestore.',
      )
    }
    throw err
  }

  try {
    await updateDoc(assignmentRef, {
      applicationCount: currentCount + 1,
      updatedAt: serverTimestamp(),
    })
  } catch {
    // Application saved — count can be reconciled later if this fails.
  }

  return { id: applicationId }
}

export { mapApplication }
