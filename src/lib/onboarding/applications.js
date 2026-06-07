import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { approveUser, rejectUser } from '../admin/userStatus'
import { ONBOARDING_SOURCE, ONBOARDING_STATUS } from '../../constants/onboarding'
import { auth, firestore } from '../../firebase/config'

function assertFirestore() {
  if (!firestore) {
    throw new Error('Firestore is niet beschikbaar.')
  }
  return firestore
}

/**
 * @param {Record<string, unknown>} formData
 * @param {{ userId?: string | null }} [options]
 */
export async function createOnboardingApplication(formData, options = {}) {
  const db = assertFirestore()
  const email = String(formData.email ?? '')
    .trim()
    .toLowerCase()

  const payload = {
    voornaam: String(formData.voornaam ?? '').trim(),
    achternaam: String(formData.achternaam ?? '').trim(),
    displayName: `${String(formData.voornaam ?? '').trim()} ${String(formData.achternaam ?? '').trim()}`.trim(),
    email,
    telefoonnummer: String(formData.telefoonnummer ?? '').trim(),
    geboortedatum: String(formData.geboortedatum ?? ''),
    woonplaats: String(formData.woonplaats ?? '').trim(),
    domeinen: Array.isArray(formData.domeinen) ? formData.domeinen : [],
    voorkeursrollen: Array.isArray(formData.voorkeursrollen) ? formData.voorkeursrollen : [],
    ervaringsniveau: String(formData.ervaringsniveau ?? ''),
    beschikbaarheid: Array.isArray(formData.beschikbaarheid) ? formData.beschikbaarheid : [],
    reisbereidheid: String(formData.reisbereidheid ?? ''),
    beveilig_diploma: String(formData.beveilig_diploma ?? ''),
    beveilig_grijze_pas: String(formData.beveilig_grijze_pas ?? ''),
    beveilig_bhv: String(formData.beveilig_bhv ?? ''),
    beveilig_vog: String(formData.beveilig_vog ?? ''),
    hosp_svh: String(formData.hosp_svh ?? ''),
    hosp_bhv: String(formData.hosp_bhv ?? ''),
    hosp_haccp: String(formData.hosp_haccp ?? ''),
    contractvoorkeur: String(formData.contractvoorkeur ?? ''),
    aanvullendeInfo: String(formData.aanvullendeInfo ?? '').trim(),
    privacyConsent: formData.privacyConsent === true,
    interestWithoutLicence: hasInterestWithoutLicence(formData),
    source: ONBOARDING_SOURCE.DIRECT_AANMELDEN,
    status: ONBOARDING_STATUS.PENDING,
    userId: options.userId ?? null,
    adminNotes: '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  const ref = await addDoc(collection(db, 'onboardingApplications'), payload)
  return { id: ref.id }
}

/** @param {Record<string, unknown>} formData */
function hasInterestWithoutLicence(formData) {
  const diploma = String(formData.beveilig_diploma ?? '')
  const pas = String(formData.beveilig_grijze_pas ?? '')
  return diploma === 'nee' || diploma === 'opleiding' || pas === 'nee' || pas === 'aanvraag'
}

/**
 * Link the latest pending application for this e-mail to a Firebase user.
 * @param {string} uid
 * @param {string} email
 */
export async function linkOnboardingApplicationToUser(uid, email) {
  const db = assertFirestore()
  const normalizedEmail = email.trim().toLowerCase()

  const snap = await getDocs(
    query(
      collection(db, 'onboardingApplications'),
      where('email', '==', normalizedEmail),
      where('status', '==', ONBOARDING_STATUS.PENDING),
      orderBy('createdAt', 'desc'),
      limit(1),
    ),
  )

  if (snap.empty) return null

  const applicationDoc = snap.docs[0]
  await updateDoc(applicationDoc.ref, {
    userId: uid,
    updatedAt: serverTimestamp(),
  })

  await updateDoc(doc(db, 'users', uid), {
    onboardingApplicationId: applicationDoc.id,
    updatedAt: serverTimestamp(),
  })

  return applicationDoc.id
}

/**
 * @param {'pending' | 'approved' | 'rejected' | 'all'} [filterStatus]
 */
export async function fetchOnboardingApplications(filterStatus = ONBOARDING_STATUS.PENDING) {
  const db = assertFirestore()

  const constraints = [orderBy('createdAt', 'desc')]
  if (filterStatus !== 'all') {
    constraints.unshift(where('status', '==', filterStatus))
  }

  const snap = await getDocs(query(collection(db, 'onboardingApplications'), ...constraints))
  return snap.docs.map((docSnap) => mapApplication(docSnap.id, docSnap.data()))
}

/** @param {string} id @param {import('firebase/firestore').DocumentData} data */
function mapApplication(id, data) {
  return {
    id,
    displayName: data.displayName ?? '',
    email: data.email ?? '',
    telefoonnummer: data.telefoonnummer ?? '',
    woonplaats: data.woonplaats ?? '',
    geboortedatum: data.geboortedatum ?? '',
    domeinen: data.domeinen ?? [],
    voorkeursrollen: data.voorkeursrollen ?? [],
    ervaringsniveau: data.ervaringsniveau ?? '',
    beschikbaarheid: data.beschikbaarheid ?? [],
    reisbereidheid: data.reisbereidheid ?? '',
    status: data.status ?? ONBOARDING_STATUS.PENDING,
    userId: data.userId ?? null,
    adminNotes: data.adminNotes ?? '',
    interestWithoutLicence: data.interestWithoutLicence === true,
    source: data.source ?? ONBOARDING_SOURCE.DIRECT_AANMELDEN,
    aanvullendeInfo: data.aanvullendeInfo ?? '',
    beveilig_diploma: data.beveilig_diploma ?? '',
    beveilig_grijze_pas: data.beveilig_grijze_pas ?? '',
    beveilig_bhv: data.beveilig_bhv ?? '',
    beveilig_vog: data.beveilig_vog ?? '',
    hosp_svh: data.hosp_svh ?? '',
    hosp_bhv: data.hosp_bhv ?? '',
    hosp_haccp: data.hosp_haccp ?? '',
    contractvoorkeur: data.contractvoorkeur ?? '',
    createdAt: data.createdAt ?? null,
  }
}

/**
 * @param {string} applicationId
 * @param {string} notes
 */
export async function saveOnboardingNotes(applicationId, notes) {
  const db = assertFirestore()
  await updateDoc(doc(db, 'onboardingApplications', applicationId), {
    adminNotes: notes.trim(),
    updatedAt: serverTimestamp(),
  })
}

async function markOnboardingReviewed(applicationId, status, adminNotes) {
  const db = assertFirestore()
  if (!auth?.currentUser) {
    throw new Error('Je moet ingelogd zijn als beheerder.')
  }

  await updateDoc(doc(db, 'onboardingApplications', applicationId), {
    status,
    adminNotes: adminNotes?.trim() ?? '',
    reviewedAt: serverTimestamp(),
    reviewedBy: auth.currentUser.uid,
    updatedAt: serverTimestamp(),
  })
}

/**
 * @param {string} applicationId
 * @param {{ userId?: string | null, adminNotes?: string }} application
 */
export async function approveOnboardingApplication(applicationId, application) {
  await markOnboardingReviewed(applicationId, ONBOARDING_STATUS.APPROVED, application.adminNotes)
  if (application.userId) {
    await approveUser(application.userId)
  }
}

/**
 * @param {string} applicationId
 * @param {{ userId?: string | null, adminNotes?: string }} application
 */
export async function rejectOnboardingApplication(applicationId, application) {
  await markOnboardingReviewed(applicationId, ONBOARDING_STATUS.REJECTED, application.adminNotes)
  if (application.userId) {
    await rejectUser(application.userId)
  }
}
