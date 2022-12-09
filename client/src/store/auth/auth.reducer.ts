import { 
    // createSlice, 
    createReducer 
} from '@reduxjs/toolkit'
import { login, logout, refresh } from 'store/auth/auth.actions'
import { message as popUpMessage } from 'antd'
import initialState from './index'


// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {},
//     extraReducers: builder => (
//         builder
//             .addCase(login.fulfilled, (state, { payload }) => {
//                 state.isAuthenticated = payload.isAuthenticated
//                 payload.message && popUpMessage.success(payload.message)
//             })
//             .addCase(login.rejected, (state) => {
//                 state.isAuthenticated = false
//             })
//             .addCase(logout.fulfilled, (state, { payload }) => {
//                 state.isAuthenticated = payload.isAuthenticated
//             })
//             .addCase(logout.rejected, (state) => {
//                 state.isAuthenticated = false
//             })
//             .addCase(refresh.fulfilled, (state, { payload }) => {
//                 state.isAuthenticated = payload.isAuthenticated
//             })
//             .addCase(refresh.rejected, (state) => {
//                 state.isAuthenticated = false
//             })
//     )
// })
const authReducer = createReducer(initialState, (builder) => (
        builder
            .addCase(login.fulfilled, (state, { payload }) => {
                state.isAuthenticated = payload.isAuthenticated
                payload.message && popUpMessage.success(payload.message)
            })
            .addCase(login.rejected, (state) => {
                state.isAuthenticated = false
            })
            .addCase(logout.fulfilled, (state, { payload }) => {
                state.isAuthenticated = payload.isAuthenticated
            })
            .addCase(logout.rejected, (state) => {
                state.isAuthenticated = false
            })
            .addCase(refresh.fulfilled, (state, { payload }) => {
                state.isAuthenticated = payload.isAuthenticated
            })
            .addCase(refresh.rejected, (state) => {
                state.isAuthenticated = false
            })
    )
)

// export const authActions = authReducer.actions
// export const authReducer = authReducer.reducer


export default authReducer
