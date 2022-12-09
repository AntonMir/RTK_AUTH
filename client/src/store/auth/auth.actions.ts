import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosAuthApi } from "axiosApi/axiosApi"
import { 
    ILogoutResponse, 
    ILogoutRequest,
    ILoginRequest, 
    ILoginResponse,
    IRefreshResponse,
    IRefreshRequest,
    IRegistrationResponse,
    IRegistrationRequest
} from "interfaces/IAuth"


export const login = createAsyncThunk<ILoginResponse, ILoginRequest>(
    'auth/login',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosAuthApi.post<ILoginResponse>('/api/auth/login', {...data})
            return response.data
        } catch (err: any) {
            return rejectWithValue(err?.response?.message)
        }
    }
)

export const logout = createAsyncThunk<ILogoutResponse, ILogoutRequest>(
    'auth/logout',
    async ( data={}, { rejectWithValue }) => {
        try {
            const response = await axiosAuthApi.post<ILogoutResponse>('/api/auth/logout', {...data})
            return response.data
        } catch (err: any) {
            return rejectWithValue(err?.response?.message)
        }
    }
)

export const registration = createAsyncThunk<IRegistrationResponse, IRegistrationRequest>(
    'auth/registration',
    async ( data, { rejectWithValue }) => {
        try {
            const response = await axiosAuthApi.post<IRegistrationResponse>('/api/auth/registration', {...data})
            return response.data
        } catch (err: any) {
            return rejectWithValue(err?.response?.message)
        }
    }
)

export const refresh = createAsyncThunk<IRefreshResponse, IRefreshRequest>(
    'auth/refresh',
    async ( data={}, { rejectWithValue }) => {
        try {
            const response = await axiosAuthApi.post<IRefreshResponse>('/api/auth/refresh', {...data})
            return response.data
        } catch (err: any) {
            return rejectWithValue(err?.response?.message)
        }
    }
)

