import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IUser } from 'interfaces/IUser'
import { ILoginResponse } from 'interfaces/IAuth'
import type { RootState } from 'store/store'
import initialState from './index'


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, { payload }: PayloadAction<ILoginResponse>) {
            state.isAuthenticated = payload.isAuthenticated
        },
        logout(state) {
            state.isAuthenticated = false
        },
    }
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer


export default authSlice.reducer
