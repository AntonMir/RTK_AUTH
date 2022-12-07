
export interface ILoginRequest {
    email: string | null
    password: string | null
}

export interface ILoginResponse {
    message: string
    isAuthenticated: boolean
}

export interface ILogoutRequest {}

export interface ILogoutResponse {
    isAuthenticated: boolean
}

export interface IRegistrationRequest {
    name: string | null
    email: string | null
    password: string | null
    confirmPassword: string | null
}

export interface IRegistrationResponse {
    message?: string | null
}