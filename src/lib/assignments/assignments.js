import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { ASSIGNMENT_STATUS } from '../../constants/assignments'
import { auth, firestore } from '../../firebase/config'

function assertFirestore() {
  if (!firestore) {
    throw new Error('Firestore is niet beschikbaar.')
  }
  return firestore
}

/**
 * @param {Record<string, unknown>} payload
 */
export async function createAssignment(payload) {
  const db = assertFirestore()
  if (!auth?.currentUser) {
    throw new Error('Je moet ingelogd zijn als beheerder.')
  }

  const data = normalizeAssignmentPayload(payload)
  const ref = await addDoc(collection(db, 'assignments'), {
    ...data,
    assignedFreelancerIds: [],
    assignedFreelancers: [],
    createdBy: auth.currentUser.uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return { id: ref.id }
}

/**
 * @param {string} assignmentId
 * @param {Record<string, unknown>} payload
 */
export async function updateAssignment(assignmentId, payload) {
  const db = assertFirestore()
  await updateDoc(doc(db, 'assignments', assignmentId), {
    ...normalizeAssignmentPayload(payload),
    updatedAt: serverTimestamp(),
  })
}

/** @param {string} assignmentId */
export async function deleteAssignment(assignmentId) {
  const db = assertFirestore()
  await deleteDoc(doc(db, 'assignments', assignmentId))
}

/**
 * @param {string} assignmentId
 * @param {Array<{ id: string, displayName: string, email: string }>} freelancers
 */
export async function assignFreelancersToAssignment(assignmentId, freelancers) {
  const db = assertFirestore()
  const ids = freelancers.map((f) => f.id)
  const assignedFreelancers = freelancers.map((f) => ({
    uid: f.id,
    displayName: f.displayName,
    email: f.email,
  }))

  await updateDoc(doc(db, 'assignments', assignmentId), {
    assignedFreelancerIds: ids,
    assignedFreelancers,
    status: ids.length > 0 ? ASSIGNMENT_STATUS.ASSIGNED : ASSIGNMENT_STATUS.OPEN,
    updatedAt: serverTimestamp(),
  })
}

/**
 * @param {string} assignmentId
 * @param {string} freelancerId
 */
export async function unassignFreelancerFromAssignment(assignmentId, freelancerId) {
  const db = assertFirestore()
  const snap = await getDoc(doc(db, 'assignments', assignmentId))
  if (!snap.exists()) return

  const data = snap.data()
  const remaining = (data.assignedFreelancers ?? []).filter((f) => f.uid !== freelancerId)
  const remainingIds = remaining.map((f) => f.uid)

  await updateDoc(doc(db, 'assignments', assignmentId), {
    assignedFreelancerIds: remainingIds,
    assignedFreelancers: remaining,
    status: remainingIds.length > 0 ? ASSIGNMENT_STATUS.ASSIGNED : ASSIGNMENT_STATUS.OPEN,
    updatedAt: serverTimestamp(),
  })
}

/**
 * @param {'draft' | 'open' | 'assigned' | 'completed' | 'cancelled' | 'all'} [filterStatus]
 */
export async function fetchAssignmentsForAdmin(filterStatus = 'all') {
  const db = assertFirestore()

  const constraints = [orderBy('createdAt', 'desc')]
  if (filterStatus !== 'all') {
    constraints.unshift(where('status', '==', filterStatus))
  }

  const snap = await getDocs(query(collection(db, 'assignments'), ...constraints))
  return snap.docs.map((docSnap) => mapAssignment(docSnap.id, docSnap.data()))
}

/** @param {string} freelancerId */
export async function fetchAssignmentsForFreelancer(freelancerId) {
  const db = assertFirestore()
  const snap = await getDocs(
    query(
      collection(db, 'assignments'),
      where('assignedFreelancerIds', 'array-contains', freelancerId),
      orderBy('dateStart', 'desc'),
    ),
  )
  return snap.docs.map((docSnap) => mapAssignment(docSnap.id, docSnap.data()))
}

/** @param {string} assignmentId */
export async function fetchAssignmentById(assignmentId) {
  const db = assertFirestore()
  const snap = await getDoc(doc(db, 'assignments', assignmentId))
  if (!snap.exists()) return null
  return mapAssignment(snap.id, snap.data())
}

/** @param {Record<string, unknown>} payload */
function normalizeAssignmentPayload(payload) {
  return {
    title: String(payload.title ?? '').trim(),
    roleLabel: String(payload.roleLabel ?? '').trim(),
    description: String(payload.description ?? '').trim(),
    assignmentType: String(payload.assignmentType ?? 'algemeen'),
    location: String(payload.location ?? '').trim(),
    dateStart: String(payload.dateStart ?? ''),
    dateEnd: String(payload.dateEnd ?? ''),
    shiftStart: String(payload.shiftStart ?? '').trim(),
    shiftEnd: String(payload.shiftEnd ?? '').trim(),
    rateNote: String(payload.rateNote ?? '').trim(),
    clientCompany: String(payload.clientCompany ?? '').trim(),
    adminNotes: String(payload.adminNotes ?? '').trim(),
    status: String(payload.status ?? ASSIGNMENT_STATUS.DRAFT),
  }
}

/** @param {string} id @param {import('firebase/firestore').DocumentData} data */
function mapAssignment(id, data) {
  return {
    id,
    title: data.title ?? '',
    roleLabel: data.roleLabel ?? '',
    description: data.description ?? '',
    assignmentType: data.assignmentType ?? 'algemeen',
    location: data.location ?? '',
    dateStart: data.dateStart ?? '',
    dateEnd: data.dateEnd ?? '',
    shiftStart: data.shiftStart ?? '',
    shiftEnd: data.shiftEnd ?? '',
    rateNote: data.rateNote ?? '',
    clientCompany: data.clientCompany ?? '',
    adminNotes: data.adminNotes ?? '',
    status: data.status ?? ASSIGNMENT_STATUS.DRAFT,
    assignedFreelancerIds: data.assignedFreelancerIds ?? [],
    assignedFreelancers: data.assignedFreelancers ?? [],
    createdAt: data.createdAt ?? null,
    updatedAt: data.updatedAt ?? null,
  }
}
