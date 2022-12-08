import React from 'react';
// navigation
import { Routes, Route, Navigate } from 'react-router-dom'
// Redux
import { useSelector } from 'react-redux'
import type { RootState } from 'store/store'
import { store } from 'store/store'
import { login } from 'store/auth/actions'
// hooks
import { useActions } from 'hooks/actions';
// components
import Layout from 'Layout'
import Auth from 'pages/Auth';
// styled
import './App.css'


const App: React.FC = () => {

    // отслеживаем процесс изменения STATE
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    const reftesh = async () => {
        await fetch('http://192.168.1.4:5000/api/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            credentials: 'include',
            body: JSON.stringify({})
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
        })
    } 


    const getUserData = async () => {
        await fetch('http://192.168.1.4:5000/api/user/profile', {
            method: 'GET',
            credentials: 'include',
        }).then(response => response.json())
        .then(response => {
            console.log(response)
        })
    } 



    // если мы авторизованы, отдаем роуты пользователя иначе отдаем внешние роуты
    if(isAuthenticated) {
        return (
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={
                        <>
                            <button onClick={() => getUserData()}> getUserData </button>
                        </>
                    }/>
                    <Route path="*" element={<Navigate replace to={`/`} />}/>
                </Route>
            </Routes>
        )
    }

    return (
        <>
            <button onClick={() => getUserData()}> getUserData </button>
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


