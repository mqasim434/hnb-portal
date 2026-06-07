import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore'
import {
  computeLineAmount,
  DEFAULT_HOURLY_RATE,
  INVOICE_STATUS,
} from '../../constants/invoices'
import { TIME_ENTRY_STATUS } from '../../constants/timeEntries'
import { auth, firestore } from '../../firebase/config'

function assertFirestore() {
  if (!firestore) {
    throw new Error('Firestore is niet beschikbaar.')
  }
  return firestore
}

/**
 * @param {string} freelancerId
 * @returns {Promise<Array<import('../timeEntries/entries').TimeEntry & { invoiceId?: string }>>}
 */
export async function fetchApprovedUninvoicedTimeEntries(freelancerId) {
  const db = assertFirestore()
  const snap = await getDocs(
    query(
      collection(db, 'timeEntries'),
      where('freelancerId', '==', freelancerId),
      where('status', '==', TIME_ENTRY_STATUS.APPROVED),
      where('invoiceId', '==', ''),
      orderBy('workDate', 'asc'),
    ),
  )
  return snap.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
    totalHours: docSnap.data().totalHours ?? 0,
  }))
}

/**
 * @param {{
 *   freelancerId: string
 *   freelancerName: string
 *   freelancerEmail: string
 *   hourlyRate?: number
 *   notes?: string
 * }} input
 */
export async function generateInvoiceFromApprovedHours(input) {
  const db = assertFirestore()
  if (!auth?.currentUser) {
    throw new Error('Je moet ingelogd zijn als beheerder.')
  }

  const hourlyRate = Number(input.hourlyRate) || DEFAULT_HOURLY_RATE
  if (hourlyRate <= 0) {
    throw new Error('Uurtarief moet groter dan nul zijn.')
  }

  const entries = await fetchApprovedUninvoicedTimeEntries(input.freelancerId)
  if (entries.length === 0) {
    throw new Error('Geen goedgekeurde, nog niet gefactureerde uren gevonden.')
  }

  const lineItems = entries.map((entry) => ({
    timeEntryId: entry.id,
    assignmentId: entry.assignmentId ?? '',
    assignmentTitle: entry.assignmentTitle ?? '',
    workDate: entry.workDate ?? '',
    hours: entry.totalHours,
    hourlyRate,
    amount: computeLineAmount(entry.totalHours, hourlyRate),
  }))

  const totalHours = lineItems.reduce((sum, line) => sum + line.hours, 0)
  const totalAmount = lineItems.reduce((sum, line) => sum + line.amount, 0)
  const dates = lineItems.map((line) => line.workDate).filter(Boolean).sort()
  const periodStart = dates[0] ?? ''
  const periodEnd = dates[dates.length - 1] ?? periodStart
  const invoiceNumber = buildInvoiceNumber()

  const batch = writeBatch(db)
  const invoiceRef = doc(collection(db, 'invoices'))

  batch.set(invoiceRef, {
    invoiceNumber,
    freelancerId: input.freelancerId,
    freelancerName: input.freelancerName,
    freelancerEmail: input.freelancerEmail,
    periodStart,
    periodEnd,
    lineItems,
    timeEntryIds: lineItems.map((line) => line.timeEntryId),
    totalHours: Math.round(totalHours * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    hourlyRate,
    status: INVOICE_STATUS.DRAFT,
    notes: String(input.notes ?? '').trim(),
    adminNotes: '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    approvedAt: null,
    paidAt: null,
    createdBy: auth.currentUser.uid,
  })

  for (const entry of entries) {
    batch.update(doc(db, 'timeEntries', entry.id), {
      invoiceId: invoiceRef.id,
      updatedAt: serverTimestamp(),
    })
  }

  await batch.commit()
  return { id: invoiceRef.id, invoiceNumber }
}

/** @param {'draft' | 'approved' | 'paid' | 'all'} [filterStatus] */
export async function fetchInvoicesForAdmin(filterStatus = INVOICE_STATUS.DRAFT) {
  const db = assertFirestore()
  const constraints = [orderBy('createdAt', 'desc')]
  if (filterStatus !== 'all') {
    constraints.unshift(where('status', '==', filterStatus))
  }
  const snap = await getDocs(query(collection(db, 'invoices'), ...constraints))
  return snap.docs.map((docSnap) => mapInvoice(docSnap.id, docSnap.data()))
}

/** @param {string} freelancerId */
export async function fetchInvoicesForFreelancer(freelancerId) {
  const db = assertFirestore()
  const snap = await getDocs(
    query(
      collection(db, 'invoices'),
      where('freelancerId', '==', freelancerId),
      where('status', 'in', [INVOICE_STATUS.APPROVED, INVOICE_STATUS.PAID]),
      orderBy('createdAt', 'desc'),
    ),
  )
  return snap.docs.map((docSnap) => mapInvoice(docSnap.id, docSnap.data()))
}

/** @param {string} invoiceId */
export async function fetchInvoiceById(invoiceId) {
  const db = assertFirestore()
  const snap = await getDoc(doc(db, 'invoices', invoiceId))
  if (!snap.exists()) return null
  return mapInvoice(snap.id, snap.data())
}

/** @param {string} invoiceId @param {string} [adminNotes] */
export async function approveInvoice(invoiceId, adminNotes = '') {
  await updateInvoiceStatus(invoiceId, INVOICE_STATUS.APPROVED, { adminNotes })
}

/** @param {string} invoiceId @param {string} [adminNotes] */
export async function markInvoicePaid(invoiceId, adminNotes = '') {
  await updateInvoiceStatus(invoiceId, INVOICE_STATUS.PAID, { adminNotes })
}

async function updateInvoiceStatus(invoiceId, status, { adminNotes = '' } = {}) {
  const db = assertFirestore()
  if (!auth?.currentUser) {
    throw new Error('Je moet ingelogd zijn als beheerder.')
  }

  const payload = {
    status,
    adminNotes: adminNotes.trim(),
    updatedAt: serverTimestamp(),
  }

  if (status === INVOICE_STATUS.APPROVED) {
    payload.approvedAt = serverTimestamp()
    payload.approvedBy = auth.currentUser.uid
  }
  if (status === INVOICE_STATUS.PAID) {
    payload.paidAt = serverTimestamp()
    payload.paidBy = auth.currentUser.uid
  }

  await updateDoc(doc(db, 'invoices', invoiceId), payload)
}

function buildInvoiceNumber() {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const suffix = String(now.getTime()).slice(-5)
  return `HNB-${y}${m}-${suffix}`
}

/** @param {string} id @param {import('firebase/firestore').DocumentData} data */
function mapInvoice(id, data) {
  return {
    id,
    invoiceNumber: data.invoiceNumber ?? '',
    freelancerId: data.freelancerId ?? '',
    freelancerName: data.freelancerName ?? '',
    freelancerEmail: data.freelancerEmail ?? '',
    periodStart: data.periodStart ?? '',
    periodEnd: data.periodEnd ?? '',
    lineItems: Array.isArray(data.lineItems) ? data.lineItems : [],
    timeEntryIds: Array.isArray(data.timeEntryIds) ? data.timeEntryIds : [],
    totalHours: data.totalHours ?? 0,
    totalAmount: data.totalAmount ?? 0,
    hourlyRate: data.hourlyRate ?? DEFAULT_HOURLY_RATE,
    status: data.status ?? INVOICE_STATUS.DRAFT,
    notes: data.notes ?? '',
    adminNotes: data.adminNotes ?? '',
    createdAt: data.createdAt ?? null,
    approvedAt: data.approvedAt ?? null,
    paidAt: data.paidAt ?? null,
  }
}
