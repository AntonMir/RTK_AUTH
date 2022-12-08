import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ILoginResponse, ILogoutResponse } from 'interfaces/IAuth'
import { login } from 'store/auth/actions'
import { message as popUpMessage } from 'antd'
import initialState from './index'


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => (
        builder
            .addCase(login.pending, (state) => {
                console.log('pending')
            })
            .addCase(login.fulfilled, (state, action) => {
                
            })
            .addCase(login.rejected, (state, { payload }) => {
                console.log(payload)
                state.isAuthenticated = false
            })
    )
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer


export default authSlice.reducer
