import React, { useCallback, useEffect } from 'react'
// redux
import { useActions } from 'hooks/actions'
// ANTD
import { LogoutOutlined } from '@ant-design/icons'
import { useLazyLogoutQuery } from 'store/auth/auth.api'

const LogOutBtn: React.FC = () => {

    const { logout } = useActions()

        // Lazy - значит, что данные не будут запрашиваться сразу а тоьлко по вызову метода loginQuery
        const [logoutQuery, {isSuccess, data }] = useLazyLogoutQuery()

    const logoutHandler = useCallback(() => {
        logoutQuery('')
    }, [logoutQuery])

    // как только приходят данные с сервера фиксирем их в STATE
    useEffect(() => {
        data && logout(data)
    }, [data, isSuccess, logout])

    return (
        <div 
            className="headerBtn" 
            onClick={logoutHandler}
        >
            <LogoutOutlined style={{margin: '0 5px 0 0'}}/>
            Выход
        </div>
    )
}

export default LogOutBtn