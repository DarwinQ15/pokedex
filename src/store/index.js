import { configureStore } from '@reduxjs/toolkit'
import isLoadingSlice from './slices/isLoading.slice'
import userNameSlice from './slices/userName.slice'

export default configureStore({
  reducer: {
        userName: userNameSlice,
        isLoading: isLoadingSlice
	}
})