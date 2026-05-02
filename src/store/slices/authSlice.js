import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  role: null,
  /** True until the first `onAuthStateChanged` snapshot is applied. */
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
    setAuthLoading(state, action) {
      state.loading = action.payload
    },
    setAuthError(state, action) {
      state.error = action.payload
    },
    clearAuth(state) {
      state.user = null
      state.role = null
      state.error = null
      state.loading = false
    },
  },
})

export const { setUser, setRole, setAuthLoading, setAuthError, clearAuth } =
  authSlice.actions

export default authSlice.reducer
