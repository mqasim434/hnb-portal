import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { ACCOUNT_STATUS, ROLES } from '../../constants/roles'
import { firestore } from '../../firebase/config'

export { approveUser, rejectUser, suspendUser } from './userStatus'

/**
 * @returns {Promise<Array<{ id: string, email: string, displayName: string, accountStatus: string, role: string | null, intendedRole?: string | null }>>}
 */
export async function fetchPendingUsers() {
  if (!firestore) return []
  const q = query(
    collection(firestore, 'users'),
    where('accountStatus', '==', ACCOUNT_STATUS.PENDING),
    orderBy('createdAt', 'desc'),
  )
  const snap = await getDocs(q)
  return snap.docs.map((docSnap) => {
    const data = docSnap.data()
    return {
      id: docSnap.id,
      email: data.email ?? '',
      displayName: data.displayName ?? '',
      accountStatus: data.accountStatus ?? ACCOUNT_STATUS.PENDING,
      role: data.role ?? null,
      intendedRole: data.intendedRole ?? null,
    }
  })
}

/**
 * @returns {Promise<Array<{ id: string, email: string, displayName: string }>>}
 */
export async function fetchActiveFreelancers() {
  if (!firestore) return []
  const snap = await getDocs(
    query(
      collection(firestore, 'users'),
      where('role', '==', ROLES.FREELANCER),
      where('accountStatus', '==', ACCOUNT_STATUS.ACTIVE),
    ),
  )
  return snap.docs
    .map((docSnap) => {
      const data = docSnap.data()
      return {
        id: docSnap.id,
        email: data.email ?? '',
        displayName: data.displayName ?? '',
      }
    })
    .sort((a, b) => a.displayName.localeCompare(b.displayName, 'nl'))
}
