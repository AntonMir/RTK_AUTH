import { configureStore } from '@reduxjs/toolkit'
import reducer from 'store/root'
import { authApi } from 'store/auth/auth.api'

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch