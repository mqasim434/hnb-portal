import { where, query, collection, getDocs } from 'firebase/firestore'
import { ASSIGNMENT_STATUS } from '../../constants/assignments'
import { APPLICATION_STATUS } from '../../constants/assignmentApplications'
import { TIME_ENTRY_STATUS } from '../../constants/timeEntries'
import {
  CORE_COMPLIANCE_TYPES,
  COMPLIANCE_STATUS,
  complianceDisplayStatus,
} from '../../constants/compliance'
import { fetchUserComplianceRecords } from '../compliance/records'
import { fetchOpenAssignmentsForFeed } from '../assignments/assignments'
import { fetchTimeEntriesForFreelancer } from '../timeEntries/entries'
import { fetchAssignmentsForFreelancer } from '../assignments/assignments'
import { firestore } from '../../firebase/config'

/**
 * @param {string} freelancerId
 */
export async function fetchFreelancerDashboardStats(freelancerId) {
  const [complianceRecords, openFeed, jobs, hours] = await Promise.all([
    fetchUserComplianceRecords(freelancerId),
    fetchOpenAssignmentsForFeed().catch(() => []),
    fetchAssignmentsForFreelancer(freelancerId).catch(() => []),
    fetchTimeEntriesForFreelancer(freelancerId).catch(() => []),
  ])

  let complianceApproved = 0
  let compliancePending = 0
  for (const type of CORE_COMPLIANCE_TYPES) {
    const status = complianceDisplayStatus(complianceRecords[type])
    if (status === COMPLIANCE_STATUS.APPROVED) complianceApproved += 1
    if (status === COMPLIANCE_STATUS.PENDING) compliancePending += 1
  }

  const hoursPending = hours.filter((e) => e.status === TIME_ENTRY_STATUS.SUBMITTED).length
  const hoursDraft = hours.filter((e) => e.status === TIME_ENTRY_STATUS.DRAFT).length

  return {
    openAssignments: openFeed.length,
    assignedJobs: jobs.length,
    hoursPending,
    hoursDraft,
    complianceApproved,
    compliancePending,
    complianceTotal: CORE_COMPLIANCE_TYPES.length,
    complianceComplete: complianceApproved === CORE_COMPLIANCE_TYPES.length,
  }
}

/**
 * @param {string} companyId
 */
export async function fetchCompanyDashboardStats(companyId) {
  if (!firestore) {
    return { openAssignments: 0, pendingApplications: 0, assignedAssignments: 0 }
  }

  const assignmentsSnap = await getDocs(
    query(collection(firestore, 'assignments'), where('companyId', '==', companyId)),
  )

  let openAssignments = 0
  let assignedAssignments = 0
  const assignmentIds = []

  for (const docSnap of assignmentsSnap.docs) {
    const data = docSnap.data()
    assignmentIds.push(docSnap.id)
    if (data.status === ASSIGNMENT_STATUS.OPEN) openAssignments += 1
    if (data.status === ASSIGNMENT_STATUS.ASSIGNED) assignedAssignments += 1
  }

  let pendingApplications = 0
  if (assignmentIds.length > 0) {
    const appsSnap = await getDocs(
      query(
        collection(firestore, 'assignmentApplications'),
        where('companyId', '==', companyId),
        where('status', '==', APPLICATION_STATUS.PENDING),
      ),
    )
    pendingApplications = appsSnap.size
  }

  return { openAssignments, pendingApplications, assignedAssignments }
}
