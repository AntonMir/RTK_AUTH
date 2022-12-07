import React, { useEffect, useState } from 'react'
// navigation
import { Link, useNavigate } from 'react-router-dom'
// Redux
import { useLazyRegistrationQuery } from 'store/auth/auth.api'
// interfaces
import { IRegistrationRequest } from 'interfaces/IAuth'
// ANTD
import { Button, Form, Input } from 'antd'
// styled
import styled from 'styled-components'


const Registration = () => {

    const navigate = useNavigate()

    // хук REDUX для отправки данных при регистрации
    const [registration ,{ isLoading, isSuccess }] = useLazyRegistrationQuery()

    // данные для отправки на бэк
    const [form, setForm] = useState<IRegistrationRequest>({ 
        name: '', 
        email: '', 
        password: '', 
        confirmPassword: '' 
    })
       

    // Отправка данных регистрационной формы на сервер
    function submitForm(data: IRegistrationRequest) {
        if(data.email) data.email = data.email.toLowerCase()
        registration(data)
    }    

    // Фиксируем все изменения полей ввода в state
    const changeUserData = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    // если рагистрация прошла успешно, перенаправляем на страницу LOGIN
    useEffect(() => {
        isSuccess && navigate('../login')
    }, [isSuccess, navigate])
    
    return (
        <Form>
            <Title>Регистрация</Title>
          
            <FormInput
                label="Имя"
                name="name"
                rules={[{ required: true, message: 'Пожалуйста введите ваше Имя!' }]}
            >
                <Input type="text" name="name" onChange={changeUserData} />
            </FormInput>

            <FormInput
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Пожалуйста введите Email!' }]}
            >
                <Input autoComplete="email" type="text" name="email" onChange={changeUserData} />
            </FormInput>

            <FormInput
                label="Пароль"
                name="password"
                rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
            >
                <Input.Password 
                    type="password" 
                    name="password" 
                    onChange={changeUserData}
                    autoComplete="new-password"
                />
            </FormInput>

            <FormInput
                label="Повторите пароль"
                name="confirmPassword"
                rules={[{ required: true, message: 'Пожалуйста введите пароль повторно!' }]}
            >
                <Input.Password 
                    autoComplete="new-password" 
                    type="password" 
                    name="confirmPassword" 
                    onChange={changeUserData} 
                />
            </FormInput>

            <FormBtn>
                <Button 
                    type="primary"
                    disabled={isLoading}
                    onClick={() => submitForm(form)}
                >
                    Регистрация
                </Button>
            </FormBtn>

            <LinkWrapper>
                <Link type="link" to="../login">Есть аккаунт? Войдите!</Link>
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

export default Registration