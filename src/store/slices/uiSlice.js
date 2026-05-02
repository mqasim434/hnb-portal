import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  globalLoading: false,
  toasts: [],
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setGlobalLoading(state, action) {
      state.globalLoading = action.payload
    },
    addToast(state, action) {
      const { id, message, variant = 'info' } = action.payload
      state.toasts.push({
        id,
        message,
        variant,
      })
    },
    removeToast(state, action) {
      const id = action.payload
      state.toasts = state.toasts.filter((t) => t.id !== id)
    },
    clearToasts(state) {
      state.toasts = []
    },
  },
})

export const { setGlobalLoading, addToast, removeToast, clearToasts } =
  uiSlice.actions

export default uiSlice.reducer
