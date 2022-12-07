import { combineReducers } from '@reduxjs/toolkit'
import { authApi } from 'store/auth/auth.api'
import authReducer from 'store/auth/auth.slice'


export default combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    // user: userReducer,
    auth: authReducer
})


