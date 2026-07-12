import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { STAFF_REQUEST_STATUS } from '../../constants/staffRequests'
import { auth, firestore } from '../../firebase/config'

function assertFirestore() {
  if (!firestore) {
    throw new Error('Firestore is niet beschikbaar.')
  }
  return firestore
}

/**
 * @param {Record<string, unknown>} formData
 */
export async function createStaffRequest(formData) {
  const db = assertFirestore()

  const payload = {
    companyName: String(formData.companyName ?? '').trim(),
    contactPerson: String(formData.contactPerson ?? '').trim(),
    email: String(formData.email ?? '')
      .trim()
      .toLowerCase(),
    phone: String(formData.phone ?? '').trim(),
    staffType: String(formData.staffType ?? ''),
    staffTypes: Array.isArray(formData.staffTypes) ? formData.staffTypes : [],
    eventType: String(formData.eventType ?? ''),
    location: String(formData.location ?? '').trim(),
    locations: Array.isArray(formData.locations) ? formData.locations : [],
    eventDateStart: String(formData.eventDateStart ?? ''),
    eventDateEnd: String(formData.eventDateEnd ?? ''),
    eventDates: String(formData.eventDates ?? ''),
    numberOfWorkers: Number(formData.numberOfWorkers),
    additionalNotes: String(formData.additionalNotes ?? '').trim(),
    privacyConsent: formData.privacyConsent === true,
    status: STAFF_REQUEST_STATUS.NEW,
    adminNotes: '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  const ref = await addDoc(collection(db, 'staffRequests'), payload)
  return { id: ref.id }
}

/**
 * @param {'new' | 'in_progress' | 'closed' | 'all'} [filterStatus]
 */
export async function fetchStaffRequests(filterStatus = STAFF_REQUEST_STATUS.NEW) {
  const db = assertFirestore()

  const constraints = [orderBy('createdAt', 'desc')]
  if (filterStatus !== 'all') {
    constraints.unshift(where('status', '==', filterStatus))
  }

  const snap = await getDocs(query(collection(db, 'staffRequests'), ...constraints))
  return snap.docs.map((docSnap) => mapStaffRequest(docSnap.id, docSnap.data()))
}

/**
 * @param {string} requestId
 * @param {string} status
 * @param {string} [adminNotes]
 */
export async function updateStaffRequestStatus(requestId, status) {
  const db = assertFirestore()
  if (!auth?.currentUser) {
    throw new Error('Je moet ingelogd zijn als beheerder.')
  }

  await updateDoc(doc(db, 'staffRequests', requestId), {
    status,
    updatedAt: serverTimestamp(),
    ...(status === STAFF_REQUEST_STATUS.CLOSED
      ? {
          handledAt: serverTimestamp(),
          handledBy: auth.currentUser.uid,
        }
      : {}),
  })
}

/**
 * @param {string} requestId
 * @param {string} notes
 */
export async function saveStaffRequestNotes(requestId, notes) {
  const db = assertFirestore()
  await updateDoc(doc(db, 'staffRequests', requestId), {
    adminNotes: notes.trim(),
    updatedAt: serverTimestamp(),
  })
}

/** @param {string} id @param {import('firebase/firestore').DocumentData} data */
function mapStaffRequest(id, data) {
  return {
    id,
    companyName: data.companyName ?? '',
    contactPerson: data.contactPerson ?? '',
    email: data.email ?? '',
    phone: data.phone ?? '',
    staffType: data.staffType ?? '',
    eventType: data.eventType ?? '',
    location: data.location ?? '',
    eventDateStart: data.eventDateStart ?? '',
    eventDateEnd: data.eventDateEnd ?? '',
    eventDates: data.eventDates ?? '',
    numberOfWorkers: data.numberOfWorkers ?? null,
    additionalNotes: data.additionalNotes ?? '',
    status: data.status ?? STAFF_REQUEST_STATUS.NEW,
    adminNotes: data.adminNotes ?? '',
    createdAt: data.createdAt ?? null,
  }
}
