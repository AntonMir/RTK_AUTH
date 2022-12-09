import React, { useEffect } from 'react';
// navigation
import { Routes, Route, Navigate } from 'react-router-dom'
// Redux
import { useSelector } from 'react-redux'
import type { RootState } from 'store/store'
import { store } from 'store/store'
import { refresh } from 'store/auth/auth.actions'
// axios
import { axiosApi } from 'axiosApi/axiosApi'
// components
import Layout from 'Layout'
import Auth from 'pages/Auth';
// styled
import './App.css'


const App: React.FC = () => {

    // отслеживаем процесс изменения STATE
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    const getUserData = async () => {
        await axiosApi.get(`${process.env.REACT_APP_SERVER_URL}/api/user/profile`)
        .then(response => {
            console.log(response)
        })
    } 

    // если уходим со страницы на другую или перезагружаем ее, сразу пробуем получить новые токены
    useEffect(() => {
        window.addEventListener('focus', () => {
            store.dispatch(refresh(''))
        })
        store.dispatch(refresh(''))
    }, [])


    // если мы авторизованы, отдаем роуты пользователя иначе отдаем внешние роуты
    if(isAuthenticated) {
        return (
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<>
                        <button onClick={() => getUserData()}> getUserData </button>
                    </>}/>
                    <Route path="*" element={<Navigate replace to={`/`} />}/>
                </Route>
            </Routes>
        )
    }

    return (
        <>
            <Routes>
                <Route path="/*" element={<Layout />}>
                    <Route path="auth/*" element={<Auth />}/>
                    <Route path="*" element={<Navigate replace to={'auth/*'} />} />
                </Route>
            </Routes>
        </>
    )
}

export default App;


