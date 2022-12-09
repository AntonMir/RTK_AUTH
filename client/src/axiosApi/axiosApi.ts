import axios from "axios";
import { logout, refresh } from "store/auth/auth.actions";
import { store } from "store/store";

// для аутентификации не нужно перезапрашивать токены в случае неудачи
export const axiosAuthApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {
        'Content-Type': `application/json;charset=utf-8`
    },
    withCredentials: true,
    timeout: 5000,
});

// для запросов любых данных кроме аутентификации
export const axiosApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {
        'Content-Type': `application/json;charset=utf-8`
    },
    withCredentials: true,
    timeout: 5000,
});

// Перехват запроса
axiosApi.interceptors.request.use((request) => {

    if (!request) {
        request = {}
    }
    if (!request.headers) {
        request.headers = {}
    }

    // если бы токены хранились в sessionStorage, добавляли бы Access Token в header для каждого запроса
    // но т.к. мы храним все в куках, такую конструкцию не берем
    // request.headers.Authorization = `Bearer ${sessionStorage.getItem('accessToken')}`
    return request
})

// Перехват ответа
axiosApi.interceptors.response.use(

    // 1 параметр - если все ок
    (request) => {
        // если все ок, отдаем, то, что есть
        return request
    },

    // 2 параметр - если ошибка
    async (error) => {

        try {
            if (error.response.status === 401 && error.config && !error.config._isRetry) {
                // обозначаем, что мы уже попытались запросить refresh и повторного запроса не будет
                error.config._isRetry = true

                // получаем новую пару токенов
                await store.dispatch(refresh(''))

                // повторная попытка запроса
                return await axiosApi.request(error.config)
            } else {
                return await store.dispatch(logout(''))
            }
        } catch (error: any) {
            throw error
        }
    }
)
