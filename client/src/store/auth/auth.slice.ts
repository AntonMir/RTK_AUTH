import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ILoginResponse, ILogoutResponse } from 'interfaces/IAuth'
import initialState from './index'


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, { payload }: PayloadAction<ILoginResponse>) {
            state.isAuthenticated = payload.isAuthenticated
        },
        logout(state, { payload }: PayloadAction<ILogoutResponse>) {
            state.isAuthenticated = payload.isAuthenticated
        },
    }
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer


export default authSlice.reducer
