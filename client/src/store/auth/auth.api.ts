import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { 
    IRegistrationRequest, 
    IRegistrationResponse, 
    ILoginRequest, 
    ILoginResponse,
} from 'interfaces/IAuth'
import { IResponseError } from 'interfaces/IGlobal'
import { message as popUpMessage} from 'antd'
import { store } from "store/store";
import { useStore } from "react-redux";
import type { RootState } from 'store/store'


/**
 * reducerPath - место в редаксе, где будут храниться все закешированные данные
 * baseQuery - все параметры запроса (своеобразный посредник для запросов)
 */
export const authApi = createApi({
    reducerPath: 'auth/api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_SERVER_URL}/api/auth`,
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            // const token = (getState() as RootState).auth.token
            // if (token) {
            //   headers.set('authorization', `Bearer ${token}`)
            // }
            return headers
        },
    }),
    endpoints: build => ({
        // build.query - для запроса данных
        // build.mutation - для изменения данных
        // IRegistrationResponse - что хотим получить
        // IRegistrationRequest - что хотим отправить
        registration: build.query<IRegistrationResponse, IRegistrationRequest>({
            query: (data: IRegistrationRequest) => ({
                url: 'registration',
                method: 'POST',
                body: data
            }),
            // transformResponse - какие-то действия с полученными данными
            transformResponse: (response: IRegistrationResponse) => {
                popUpMessage.success(response.message)                
                return response
            },
            transformErrorResponse: (error: { status: string | number }, meta, args) => {
                popUpMessage.error(error.status)
                return error
            }
        }),
        login: build.query<ILoginResponse, ILoginRequest>({
            query: (data: ILoginRequest) => ({
                url: 'login',
                method: 'POST',
                body: data
            }),
            // transformResponse - какие-то действия с полученными данными
            transformResponse: (response: ILoginResponse) => {
                popUpMessage.success(response.message)
                return response
            },
            transformErrorResponse: (response: { status: number, data: IResponseError }) => {
                popUpMessage.error(response.data.message)
                return response
            },

        }),
        
    })
})

// useRegistrationQuery - автосгенирированный хук используемый при загрузке компонента
// useLazyRegistrationQuery - хук для исользования по необходимости

export const { 
    useLazyRegistrationQuery, 
    useRegistrationQuery,
    useLazyLoginQuery,
    useLoginQuery
} = authApi