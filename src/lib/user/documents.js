import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { firestore } from '../../firebase/config'

/**
 * @param {string} uid
 * @param {{ url: string, fileId: string, name: string, category?: string }} payload
 */
export async function saveUserDocument(uid, payload) {
  if (!firestore) {
    throw new Error('Firestore is niet beschikbaar.')
  }

  await setDoc(
    doc(firestore, 'users', uid, 'documents', payload.fileId),
    {
      url: payload.url,
      fileId: payload.fileId,
      name: payload.name,
      imagekitPath: payload.imagekitPath ?? null,
      category: payload.category ?? 'general',
      uploadedAt: serverTimestamp(),
    },
    { merge: true },
  )
}
