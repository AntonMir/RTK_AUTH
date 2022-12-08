import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosApi } from "API/api"
import { 
    ILogoutResponse, 
    ILogoutRequest,
    ILoginRequest, 
    ILoginResponse 
} from "interfaces/IAuth"


export const login = createAsyncThunk<ILoginResponse, ILoginRequest>(
    'auth/login',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post('/api/auth/login', {...data})
            return response.data
        } catch (err: any) {
            return rejectWithValue(err?.response?.message)
        }
    }
)

export const logout = createAsyncThunk<ILogoutResponse, ILogoutRequest>(
    'auth/logout',
    async (data={}, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post('/api/auth/logout', {data})
            return response.data
        } catch (err: any) {
            return rejectWithValue(err?.response?.message)
        }
    }
)

