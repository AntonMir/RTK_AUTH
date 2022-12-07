export interface IUser {
    first_name: string
    last_name: string
}

export interface IUserResponse {
    user: IUser
    token: string
}