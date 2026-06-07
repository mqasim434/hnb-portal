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
import { computeTotalHours, TIME_ENTRY_STATUS } from '../../constants/timeEntries'
import { auth, firestore } from '../../firebase/config'

function assertFirestore() {
  if (!firestore) {
    throw new Error('Firestore is niet beschikbaar.')
  }
  return firestore
}

/**
 * @param {Record<string, unknown>} payload
 * @param {{ uid: string, email?: string | null, displayName?: string | null }} freelancer
 */
export async function createTimeEntry(payload, freelancer) {
  const db = assertFirestore()
  const totalHours = computeTotalHours(
    String(payload.startTime),
    String(payload.endTime),
    Number(payload.breakMinutes ?? 0),
  )
  if (totalHours == null) {
    throw new Error('Ongeldige werktijden. Controleer start, eind en pauze.')
  }

  const ref = await addDoc(collection(db, 'timeEntries'), {
    ...normalizePayload(payload, totalHours),
    freelancerId: freelancer.uid,
    freelancerEmail: freelancer.email ?? null,
    freelancerName: freelancer.displayName ?? '',
    status: TIME_ENTRY_STATUS.DRAFT,
    adminNotes: '',
    invoiceId: '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    submittedAt: null,
  })

  return { id: ref.id }
}

/**
 * @param {string} entryId
 * @param {Record<string, unknown>} payload
 */
export async function updateTimeEntry(entryId, payload) {
  const db = assertFirestore()
  const totalHours = computeTotalHours(
    String(payload.startTime),
    String(payload.endTime),
    Number(payload.breakMinutes ?? 0),
  )
  if (totalHours == null) {
    throw new Error('Ongeldige werktijden. Controleer start, eind en pauze.')
  }

  await updateDoc(doc(db, 'timeEntries', entryId), {
    ...normalizePayload(payload, totalHours),
    updatedAt: serverTimestamp(),
  })
}

/** @param {string} entryId */
export async function submitTimeEntry(entryId) {
  const db = assertFirestore()
  const snap = await getDoc(doc(db, 'timeEntries', entryId))
  if (!snap.exists()) throw new Error('Urenregistratie niet gevonden.')

  const status = snap.data().status
  if (status !== TIME_ENTRY_STATUS.DRAFT && status !== TIME_ENTRY_STATUS.REJECTED) {
    throw new Error('Alleen concepten of afgewezen registraties kunnen worden ingediend.')
  }

  await updateDoc(doc(db, 'timeEntries', entryId), {
    status: TIME_ENTRY_STATUS.SUBMITTED,
    submittedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

/** @param {string} entryId */
export async function deleteTimeEntry(entryId) {
  const db = assertFirestore()
  await deleteDoc(doc(db, 'timeEntries', entryId))
}

/** @param {string} freelancerId */
export async function fetchTimeEntriesForFreelancer(freelancerId) {
  const db = assertFirestore()
  const snap = await getDocs(
    query(
      collection(db, 'timeEntries'),
      where('freelancerId', '==', freelancerId),
      orderBy('createdAt', 'desc'),
    ),
  )
  return snap.docs.map((docSnap) => mapTimeEntry(docSnap.id, docSnap.data()))
}

/** @param {string} entryId */
export async function fetchTimeEntryById(entryId) {
  const db = assertFirestore()
  const snap = await getDoc(doc(db, 'timeEntries', entryId))
  if (!snap.exists()) return null
  return mapTimeEntry(snap.id, snap.data())
}

/**
 * @param {'submitted' | 'approved' | 'rejected' | 'draft' | 'all'} [filterStatus]
 */
export async function fetchTimeEntriesForAdmin(filterStatus = TIME_ENTRY_STATUS.SUBMITTED) {
  const db = assertFirestore()

  const constraints = [orderBy('createdAt', 'desc')]
  if (filterStatus !== 'all') {
    constraints.unshift(where('status', '==', filterStatus))
  }

  const snap = await getDocs(query(collection(db, 'timeEntries'), ...constraints))
  return snap.docs.map((docSnap) => mapTimeEntry(docSnap.id, docSnap.data()))
}

/**
 * @param {string} entryId
 * @param {string} [adminNotes]
 */
export async function approveTimeEntry(entryId, adminNotes = '') {
  await markTimeEntryReview(entryId, TIME_ENTRY_STATUS.APPROVED, adminNotes)
}

/**
 * @param {string} entryId
 * @param {string} [adminNotes]
 */
export async function rejectTimeEntry(entryId, adminNotes = '') {
  await markTimeEntryReview(entryId, TIME_ENTRY_STATUS.REJECTED, adminNotes)
}

async function markTimeEntryReview(entryId, status, adminNotes) {
  const db = assertFirestore()
  if (!auth?.currentUser) {
    throw new Error('Je moet ingelogd zijn als beheerder.')
  }

  await updateDoc(doc(db, 'timeEntries', entryId), {
    status,
    adminNotes: adminNotes.trim(),
    reviewedAt: serverTimestamp(),
    reviewedBy: auth.currentUser.uid,
    updatedAt: serverTimestamp(),
  })
}

/** @param {Record<string, unknown>} payload @param {number} totalHours */
function normalizePayload(payload, totalHours) {
  return {
    assignmentId: String(payload.assignmentId ?? ''),
    assignmentTitle: String(payload.assignmentTitle ?? ''),
    workDate: String(payload.workDate ?? ''),
    startTime: String(payload.startTime ?? ''),
    endTime: String(payload.endTime ?? ''),
    breakMinutes: Number(payload.breakMinutes ?? 0),
    totalHours,
    notes: String(payload.notes ?? '').trim(),
  }
}

/** @param {string} id @param {import('firebase/firestore').DocumentData} data */
function mapTimeEntry(id, data) {
  return {
    id,
    freelancerId: data.freelancerId ?? '',
    freelancerName: data.freelancerName ?? '',
    freelancerEmail: data.freelancerEmail ?? '',
    assignmentId: data.assignmentId ?? '',
    assignmentTitle: data.assignmentTitle ?? '',
    workDate: data.workDate ?? '',
    startTime: data.startTime ?? '',
    endTime: data.endTime ?? '',
    breakMinutes: data.breakMinutes ?? 0,
    totalHours: data.totalHours ?? 0,
    notes: data.notes ?? '',
    status: data.status ?? TIME_ENTRY_STATUS.DRAFT,
    adminNotes: data.adminNotes ?? '',
    invoiceId: data.invoiceId ?? '',
    createdAt: data.createdAt ?? null,
    submittedAt: data.submittedAt ?? null,
    reviewedAt: data.reviewedAt ?? null,
  }
}
