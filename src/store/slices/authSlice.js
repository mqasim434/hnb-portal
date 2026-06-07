import { createSlice } from '@reduxjs/toolkit'

/** @typedef {{ uid: string, email: string | null, displayName: string | null, role: string | null, accountStatus: string, intendedRole?: string | null }} UserProfile */

const initialState = {
  user: null,
  role: null,
  accountStatus: null,
  /** @type {UserProfile | null} */
  profile: null,
  loading: true,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    setRole(state, action) {
      state.role = action.payload
    },
    setAccountStatus(state, action) {
      state.accountStatus = action.payload
    },
    setProfile(state, action) {
      state.profile = action.payload
    },
    setAuthLoading(state, action) {
      state.loading = action.payload
    },
    setAuthError(state, action) {
      state.error = action.payload
    },
    clearAuth(state) {
      state.user = null
      state.role = null
      state.accountStatus = null
      state.profile = null
      state.error = null
      state.loading = false
    },
  },
})

export const {
  setUser,
  setRole,
  setAccountStatus,
  setProfile,
  setAuthLoading,
  setAuthError,
  clearAuth,
} = authSlice.actions

export default authSlice.reducer
