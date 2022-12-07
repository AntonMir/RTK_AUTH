import React from 'react'
// navigation
import { Routes, Route, Navigate } from 'react-router-dom'
// components 
import Login from 'components/Login'
import Registration from 'components/Registration'
// antd
import { Row, Card } from 'antd'

const Auth: React.FC = () => {

    return (
        <Row justify="center" align="middle" className="h100">
            <Card style={{ minWidth: '25%'}}>
                <Routes>
                    <Route path="/login" element={<Login />} key="/login" />
                    <Route path="/registration" element={<Registration />} key="/registration" />
                    <Route path="/*" element={<Navigate replace to="/auth/login" />} />
                </Routes>
             </Card>
        </Row>
        
    )
}


export default Auth