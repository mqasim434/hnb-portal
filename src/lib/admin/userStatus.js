import { doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { auth, firestore } from '../../firebase/config'
import { ACCOUNT_STATUS, ROLES } from '../../constants/roles'

/**
 * @param {string} uid
 * @param {{ role: string | null, accountStatus: string }} payload
 */
async function updateUserStatus(uid, { role, accountStatus }) {
  if (!firestore) {
    throw new Error('Firestore is niet beschikbaar.')
  }
  if (!auth?.currentUser) {
    throw new Error('Je moet ingelogd zijn als beheerder.')
  }

  await updateDoc(doc(firestore, 'users', uid), {
    role,
    accountStatus,
    updatedAt: serverTimestamp(),
    ...(accountStatus === ACCOUNT_STATUS.ACTIVE
      ? {
          approvedAt: serverTimestamp(),
          approvedBy: auth.currentUser.uid,
        }
      : {}),
  })
}

/**
 * @param {string} uid
 * @param {'freelancer' | 'admin' | 'company'} role
 */
export async function approveUser(uid, role = ROLES.FREELANCER) {
  await updateUserStatus(uid, { role, accountStatus: ACCOUNT_STATUS.ACTIVE })
  return { success: true, uid, role, accountStatus: ACCOUNT_STATUS.ACTIVE }
}

/** @param {string} uid */
export async function rejectUser(uid) {
  await updateUserStatus(uid, { role: null, accountStatus: ACCOUNT_STATUS.REJECTED })
  return { success: true, uid, accountStatus: ACCOUNT_STATUS.REJECTED }
}

/** @param {string} uid */
export async function suspendUser(uid) {
  await updateUserStatus(uid, { role: ROLES.FREELANCER, accountStatus: ACCOUNT_STATUS.SUSPENDED })
  return { success: true, uid, accountStatus: ACCOUNT_STATUS.SUSPENDED }
}
