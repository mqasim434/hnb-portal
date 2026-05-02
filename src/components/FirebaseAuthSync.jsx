import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'
import {
  clearAuth,
  setAuthLoading,
  setRole,
  setUser,
} from '../store/slices/authSlice'

/**
 * Keeps Redux auth in sync with Firebase Auth.
 * Role is read from custom claims (`role`: `freelancer` | `admin`).
 */
export default function FirebaseAuthSync() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!auth) {
      dispatch(clearAuth())
      return
    }

    dispatch(setAuthLoading(true))
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        dispatch(clearAuth())
        dispatch(setAuthLoading(false))
        return
      }

      dispatch(
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email ?? null,
          displayName: firebaseUser.displayName ?? null,
        }),
      )

      try {
        const { claims } = await firebaseUser.getIdTokenResult()
        const claimRole = claims.role
        dispatch(
          setRole(typeof claimRole === 'string' ? claimRole : null),
        )
      } catch {
        dispatch(setRole(null))
      }

      dispatch(setAuthLoading(false))
    })

    return () => unsubscribe()
  }, [dispatch])

  return null
}
