import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

function hasRequiredConfig() {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.storageBucket &&
      firebaseConfig.messagingSenderId &&
      firebaseConfig.appId,
  )
}

let app = null

try {
  if (hasRequiredConfig()) {
    app =
      getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
  } else if (import.meta.env.DEV) {
    console.warn(
      '[H&B Portal] Firebase env vars missing. Copy .env.example to .env — app runs without Firebase until configured.',
    )
  }
} catch (err) {
  console.error('[H&B Portal] Firebase initialization failed:', err)
  app = null
}

/** Null when env is incomplete or init failed — UI should still render. */
export const auth = app ? getAuth(app) : null
export const firestore = app ? getFirestore(app) : null
export const storage = app ? getStorage(app) : null

export { app }
