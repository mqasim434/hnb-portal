import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  runTransaction,
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

/**
 * @param {string} assignmentId
 * @param {string} companyId
 */
export async function fetchApplicationsForAssignment(assignmentId, companyId) {
  const db = assertFirestore()
  assertSignedIn()

  const snap = await getDocs(
    query(
      collection(db, 'assignmentApplications'),
      where('assignmentId', '==', assignmentId),
      where('companyId', '==', companyId),
      orderBy('createdAt', 'desc'),
    ),
  )

  return snap.docs.map((docSnap) => mapApplication(docSnap.id, docSnap.data()))
}

/**
 * Company selects one freelancer for an open opdracht (Module 4).
 * @param {string} assignmentId
 * @param {string} companyId
 * @param {string} applicationId
 */
export async function selectFreelancerForAssignment(assignmentId, companyId, applicationId) {
  const db = assertFirestore()
  assertSignedIn()

  await runTransaction(db, async (transaction) => {
    const assignmentRef = doc(db, 'assignments', assignmentId)
    const selectedRef = doc(db, 'assignmentApplications', applicationId)

    const [assignmentSnap, selectedSnap] = await Promise.all([
      transaction.get(assignmentRef),
      transaction.get(selectedRef),
    ])

    if (!assignmentSnap.exists()) {
      throw new Error('Opdracht niet gevonden.')
    }

    const assignmentData = assignmentSnap.data()
    if (assignmentData.companyId !== companyId) {
      throw new Error('Geen toegang tot deze opdracht.')
    }
    if (assignmentData.status !== ASSIGNMENT_STATUS.OPEN) {
      throw new Error('Deze opdracht accepteert geen selecties meer.')
    }

    if (!selectedSnap.exists()) {
      throw new Error('Sollicitatie niet gevonden.')
    }

    const selected = selectedSnap.data()
    if (selected.assignmentId !== assignmentId || selected.companyId !== companyId) {
      throw new Error('Sollicitatie hoort niet bij deze opdracht.')
    }
    if (selected.status !== APPLICATION_STATUS.PENDING) {
      throw new Error('Deze sollicitatie kan niet meer worden geselecteerd.')
    }

    const applicationsSnap = await transaction.get(
      query(collection(db, 'assignmentApplications'), where('assignmentId', '==', assignmentId)),
    )

    for (const applicationDoc of applicationsSnap.docs) {
      const data = applicationDoc.data()
      if (data.companyId !== companyId) continue

      if (applicationDoc.id === applicationId) {
        transaction.update(applicationDoc.ref, {
          status: APPLICATION_STATUS.ACCEPTED,
          updatedAt: serverTimestamp(),
        })
      } else if (data.status === APPLICATION_STATUS.PENDING) {
        transaction.update(applicationDoc.ref, {
          status: APPLICATION_STATUS.REJECTED,
          updatedAt: serverTimestamp(),
        })
      }
    }

    transaction.update(assignmentRef, {
      status: ASSIGNMENT_STATUS.ASSIGNED,
      assignedFreelancerIds: [selected.freelancerId],
      assignedFreelancers: [
        {
          uid: selected.freelancerId,
          displayName: selected.freelancerName ?? '',
          email: selected.freelancerEmail ?? '',
        },
      ],
      updatedAt: serverTimestamp(),
    })
  })
}

export { mapApplication }
