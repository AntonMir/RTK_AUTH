import React, { useEffect, useState } from 'react'
// navigation
import { Link } from 'react-router-dom'
// interfaces
import { ILoginRequest } from 'interfaces/IAuth'
// hooks
import { useActions } from 'hooks/actions'
// Redux
import { useLazyLoginQuery } from 'store/auth/auth.api'
// ANTD
import { Button, Form, Input } from 'antd'
// styles
import styled from 'styled-components'


const Login: React.FC = () => {

    const {login} = useActions()

    // Lazy - значит, что данные не будут запрашиваться сразу а тоьлко по вызову метода loginQuery
    const [loginQuery, { isLoading, isSuccess , data }] = useLazyLoginQuery()

    const [form, setForm] = useState<ILoginRequest>({ email: '', password: '' })
    
    // Отправка данных регистрационной формы на бэк
    function submitForm(data: ILoginRequest) {
        if(data.email) data.email = data.email.toLowerCase()
        loginQuery(data)
    }
    
    // Фиксируем все изменения полей ввода в state
    const changeUserData = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    
    // как только приходят данные с сервера фиксирем их в STATE
    useEffect(() => {
        data && login(data)
    }, [data, isSuccess, login])

    return (
        <Form>
            <Title>Авторизация</Title>

            <FormInput label="Email" name="email" >
                <Input type="text" name="email" onChange={changeUserData} />
            </FormInput>

            <FormInput label="Пароль" name="password" >
                <Input.Password 
                    autoComplete="current-password"
                    type="password" 
                    name="password" 
                    onChange={changeUserData} 
                />
            </FormInput>

            <FormBtn>
                <Button 
                    type="primary" 
                    loading={isLoading}
                    onClick={() => submitForm(form)}
                >
                    Войти
                </Button>
            </FormBtn>
            
            <LinkWrapper>
                <Link type="link" to="../registration">Нет аккаунта? Зарегистрируйтесь!</Link>
            </LinkWrapper>
        </Form>
    )
}

const Title = styled.h1`
    text-align: center;
    margin-bottom: 30px;
`

// фиксируем ширину поля ввода
const FormInput = styled(Form.Item)`
    .ant-form-item-row {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .ant-form-item-control {
        max-width: 80%;
    }
`

// ширина и отцентровка кнопки
const FormBtn = styled(Form.Item)`
    display: flex;
    justify-content: center;
`

// отцентровка текста ссылки
const LinkWrapper = styled.div`
    display: flex;
    justify-content: center; 
`

export default Login