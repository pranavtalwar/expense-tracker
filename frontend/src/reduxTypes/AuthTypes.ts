export interface Auth {
    token: string | undefined
    isAuthenticated: boolean
    user: User | null
    error: string | undefined
}

export interface User {
    age?: number
    firstName: string
    lastName: string
    email: string
}

export interface UserRegistration extends User{
    password: string
}

export interface AuthAction {
    type: string
    token?: string
    user?: User,
    error?: string
    errorText?: string
}

export interface LoginAction {
    type: string,
    token?: string,
    user?: User,
    error?: string
}

export interface RegistrationAction {
    type: string
    error?: string
}

export interface ErrorAction {
    type: string,
    errorText?: string
}

export interface EditAction {
    type: string,
    user?: UserEdit
}

export interface UserEdit {
    firstName: string,
    lastName: string,
    age : number | null
}