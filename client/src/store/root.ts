import { combineReducers } from '@reduxjs/toolkit'
// import { authApi } from 'store/auth/auth.api'
import authReducer from 'store/auth/auth.reducer'


export default combineReducers({
    // [authApi.reducerPath]: authApi.reducer,
    // user: userReducer,
    auth: authReducer
})


