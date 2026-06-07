import { collection, collectionGroup, getDocs, orderBy, query, where } from 'firebase/firestore'
import { ONBOARDING_STATUS } from '../../constants/onboarding'
import {
  COMPLIANCE_STATUS,
  COMPLIANCE_TYPE_CONFIG,
} from '../../constants/compliance'
import { INVOICE_STATUS, invoiceStatusLabel } from '../../constants/invoices'
import { ACCOUNT_STATUS, ROLES } from '../../constants/roles'
import { STAFF_REQUEST_STATUS } from '../../constants/staffRequests'
import { TIME_ENTRY_STATUS, timeEntryStatusLabel } from '../../constants/timeEntries'
import { fetchComplianceReviewQueue } from '../compliance/records'
import { fetchInvoicesForAdmin } from '../invoices/invoices'
import { fetchTimeEntriesForAdmin } from '../timeEntries/entries'
import { firestore } from '../../firebase/config'
import { downloadCsv, formatTimestampForCsv } from './csv'

/** @param {string} type */
function complianceTypeLabel(type) {
  return COMPLIANCE_TYPE_CONFIG[type]?.label ?? type ?? ''
}

function assertFirestore() {
  if (!firestore) {
    throw new Error('Firestore is niet beschikbaar.')
  }
  return firestore
}

/** @param {import('firebase/firestore').Query} q */
async function countQuery(q) {
  const snap = await getDocs(q)
  return snap.size
}

export async function fetchAdminKpis() {
  const db = assertFirestore()

  const [
    pendingUsers,
    activeFreelancers,
    pendingOnboarding,
    newStaffRequests,
    submittedHours,
    pendingCompliance,
    draftInvoices,
    approvedInvoices,
  ] = await Promise.all([
    countQuery(
      query(collection(db, 'users'), where('accountStatus', '==', ACCOUNT_STATUS.PENDING)),
    ),
    countQuery(
      query(
        collection(db, 'users'),
        where('role', '==', ROLES.FREELANCER),
        where('accountStatus', '==', ACCOUNT_STATUS.ACTIVE),
      ),
    ),
    countQuery(
      query(
        collection(db, 'onboardingApplications'),
        where('status', '==', ONBOARDING_STATUS.PENDING),
      ),
    ),
    countQuery(
      query(collection(db, 'staffRequests'), where('status', '==', STAFF_REQUEST_STATUS.NEW)),
    ),
    countQuery(
      query(collection(db, 'timeEntries'), where('status', '==', TIME_ENTRY_STATUS.SUBMITTED)),
    ),
    countQuery(
      query(collectionGroup(db, 'compliance'), where('status', '==', COMPLIANCE_STATUS.PENDING)),
    ),
    countQuery(
      query(collection(db, 'invoices'), where('status', '==', INVOICE_STATUS.DRAFT)),
    ),
    countQuery(
      query(collection(db, 'invoices'), where('status', '==', INVOICE_STATUS.APPROVED)),
    ),
  ])

  return {
    pendingUsers,
    activeFreelancers,
    pendingOnboarding,
    newStaffRequests,
    submittedHours,
    pendingCompliance,
    draftInvoices,
    approvedInvoices,
  }
}

export async function exportUsersCsv() {
  const db = assertFirestore()
  const snap = await getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc')))

  downloadCsv(
    `hnb-gebruikers-${dateStamp()}.csv`,
    ['ID', 'E-mail', 'Naam', 'Rol', 'Status', 'Aangemaakt'],
    snap.docs.map((docSnap) => {
      const data = docSnap.data()
      return [
        docSnap.id,
        data.email ?? '',
        data.displayName ?? '',
        data.role ?? '',
        data.accountStatus ?? '',
        formatTimestampForCsv(data.createdAt),
      ]
    }),
  )
}

export async function exportHoursCsv() {
  const entries = await fetchTimeEntriesForAdmin('all')

  downloadCsv(
    `hnb-uren-${dateStamp()}.csv`,
    [
      'ID',
      'Freelancer',
      'E-mail',
      'Opdracht',
      'Datum',
      'Start',
      'Eind',
      'Pauze (min)',
      'Uren',
      'Status',
      'Factuur-ID',
      'Ingediend',
    ],
    entries.map((entry) => [
      entry.id,
      entry.freelancerName,
      entry.freelancerEmail,
      entry.assignmentTitle,
      entry.workDate,
      entry.startTime,
      entry.endTime,
      entry.breakMinutes,
      entry.totalHours,
      timeEntryStatusLabel(entry.status),
      entry.invoiceId ?? '',
      formatTimestampForCsv(entry.submittedAt),
    ]),
  )
}

export async function exportComplianceCsv() {
  const records = await fetchComplianceReviewQueue('all')

  downloadCsv(
    `hnb-compliance-${dateStamp()}.csv`,
    [
      'Gebruiker-ID',
      'E-mail',
      'Naam',
      'Type',
      'Status',
      'Documentnummer',
      'Vervaldatum',
      'Ingediend',
    ],
    records.map((record) => [
      record.userId,
      record.userEmail,
      record.userDisplayName,
      complianceTypeLabel(record.type),
      record.status,
      record.documentNumber,
      record.expiryDate ?? '',
      formatTimestampForCsv(record.submittedAt),
    ]),
  )
}

export async function exportInvoicesCsv() {
  const invoices = await fetchInvoicesForAdmin('all')

  downloadCsv(
    `hnb-facturen-${dateStamp()}.csv`,
    [
      'Factuurnummer',
      'Freelancer',
      'E-mail',
      'Periode van',
      'Periode tot',
      'Uren',
      'Bedrag',
      'Status',
      'Aangemaakt',
    ],
    invoices.map((invoice) => [
      invoice.invoiceNumber,
      invoice.freelancerName,
      invoice.freelancerEmail,
      invoice.periodStart,
      invoice.periodEnd,
      invoice.totalHours,
      invoice.totalAmount,
      invoiceStatusLabel(invoice.status),
      formatTimestampForCsv(invoice.createdAt),
    ]),
  )
}

function dateStamp() {
  return new Date().toISOString().slice(0, 10)
}
