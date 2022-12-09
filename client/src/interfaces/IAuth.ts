
export interface ILoginRequest {
    email: string | null
    password: string | null
}

export interface ILoginResponse {
    isAuthenticated: boolean
    message?: string
}

export interface ILogoutRequest {}

export interface ILogoutResponse {
    isAuthenticated: boolean
}

export interface IRegistrationRequest {
    name: String
    email: string
    password: string
    confirmPassword: string
}

export interface IRegistrationResponse {
    message?: string
}

export interface IRefreshRequest {}

export interface IRefreshResponse {
    isAuthenticated: boolean
}