import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { COMPLIANCE_STATUS } from '../../constants/compliance'
import { auth, firestore } from '../../firebase/config'
import { uploadUserFile } from '../imagekit/upload'

function assertFirestore() {
  if (!firestore) {
    throw new Error('Firestore is niet beschikbaar.')
  }
  return firestore
}

/**
 * @param {string} uid
 * @returns {Promise<Record<string, import('../../constants/compliance').ComplianceRecord>>}
 */
export async function fetchUserComplianceRecords(uid) {
  const db = assertFirestore()
  const snap = await getDocs(collection(db, 'users', uid, 'compliance'))
  /** @type {Record<string, object>} */
  const records = {}
  for (const docSnap of snap.docs) {
    records[docSnap.id] = mapComplianceRecord(docSnap.id, docSnap.data())
  }
  return records
}

/**
 * @param {string} uid
 * @param {string} type
 * @param {{
 *   file: File,
 *   documentNumber?: string,
 *   expiryDate?: string,
 *   userEmail?: string | null,
 *   userDisplayName?: string | null,
 * }} payload
 */
export async function submitComplianceRecord(uid, type, payload) {
  const db = assertFirestore()
  const upload = await uploadUserFile(uid, payload.file, `compliance/${type}`)

  await setDoc(
    doc(db, 'users', uid, 'compliance', type),
    {
      type,
      status: COMPLIANCE_STATUS.PENDING,
      documentNumber: payload.documentNumber?.trim() ?? '',
      expiryDate: payload.expiryDate ?? null,
      fileUrl: upload.url,
      fileId: upload.fileId,
      fileName: upload.name,
      imagekitPath: upload.imagekitPath,
      userEmail: payload.userEmail ?? auth?.currentUser?.email ?? null,
      userDisplayName: payload.userDisplayName ?? auth?.currentUser?.displayName ?? null,
      adminNotes: '',
      submittedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  )

  return { type, ...upload }
}

/**
 * @param {'pending' | 'approved' | 'rejected' | 'expired' | 'all'} [filterStatus]
 */
export async function fetchComplianceReviewQueue(filterStatus = COMPLIANCE_STATUS.PENDING) {
  const db = assertFirestore()

  const constraints = [orderBy('submittedAt', 'desc')]
  if (filterStatus !== 'all') {
    constraints.unshift(where('status', '==', filterStatus))
  }

  const snap = await getDocs(query(collectionGroup(db, 'compliance'), ...constraints))
  return snap.docs.map((docSnap) => {
    const userId = docSnap.ref.parent.parent?.id ?? ''
    return {
      userId,
      ...mapComplianceRecord(docSnap.id, docSnap.data()),
    }
  })
}

/** @param {string} userId @param {string} type */
export async function fetchComplianceRecord(userId, type) {
  const db = assertFirestore()
  const snap = await getDoc(doc(db, 'users', userId, 'compliance', type))
  if (!snap.exists()) return null
  return mapComplianceRecord(type, snap.data())
}

/**
 * @param {string} userId
 * @param {string} type
 * @param {string} [adminNotes]
 */
export async function approveComplianceRecord(userId, type, adminNotes = '') {
  await markComplianceReview(userId, type, COMPLIANCE_STATUS.APPROVED, adminNotes)
}

/**
 * @param {string} userId
 * @param {string} type
 * @param {string} [adminNotes]
 */
export async function rejectComplianceRecord(userId, type, adminNotes = '') {
  await markComplianceReview(userId, type, COMPLIANCE_STATUS.REJECTED, adminNotes)
}

/**
 * @param {string} userId
 * @param {string} type
 * @param {string} [adminNotes]
 */
export async function markComplianceExpired(userId, type, adminNotes = '') {
  await markComplianceReview(userId, type, COMPLIANCE_STATUS.EXPIRED, adminNotes)
}

async function markComplianceReview(userId, type, status, adminNotes) {
  const db = assertFirestore()
  if (!auth?.currentUser) {
    throw new Error('Je moet ingelogd zijn als beheerder.')
  }

  await updateDoc(doc(db, 'users', userId, 'compliance', type), {
    status,
    adminNotes: adminNotes.trim(),
    reviewedAt: serverTimestamp(),
    reviewedBy: auth.currentUser.uid,
    updatedAt: serverTimestamp(),
  })
}

/**
 * @param {string} userId
 * @param {string} type
 * @param {string} notes
 */
export async function saveComplianceAdminNotes(userId, type, notes) {
  const db = assertFirestore()
  await updateDoc(doc(db, 'users', userId, 'compliance', type), {
    adminNotes: notes.trim(),
    updatedAt: serverTimestamp(),
  })
}

/** @param {string} id @param {import('firebase/firestore').DocumentData} data */
function mapComplianceRecord(id, data) {
  return {
    id,
    type: data.type ?? id,
    status: data.status ?? COMPLIANCE_STATUS.PENDING,
    documentNumber: data.documentNumber ?? '',
    expiryDate: data.expiryDate ?? null,
    fileUrl: data.fileUrl ?? '',
    fileId: data.fileId ?? '',
    fileName: data.fileName ?? '',
    imagekitPath: data.imagekitPath ?? null,
    userEmail: data.userEmail ?? '',
    userDisplayName: data.userDisplayName ?? '',
    adminNotes: data.adminNotes ?? '',
    submittedAt: data.submittedAt ?? null,
    reviewedAt: data.reviewedAt ?? null,
  }
}
