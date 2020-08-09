import { LoginAction, RegistrationAction, User, UserEdit, ErrorAction, EditAction } from '../reduxTypes/AuthTypes'
import { history } from '../router/AppRouter'
import { Dispatch } from "react"
import axios from "axios"
import { url } from '../constants'
import getAuthHeader from '../utils/AuthHeader'

interface LoginResponse extends Response {
    data: {
        token: string,
        user: {
            age: number,
            firstName: string,
            lastName: string,
            email: string
        }
    }     
}

const loginSuccess = (token: string, user: User): LoginAction => ({
    type: 'LOGIN_SUCCESS',
    token,
    user
})

const loginFailure = (error: string): LoginAction => ({
    type: 'LOGIN_FAILURE',
    error
})

export const startLogin = ({ email, password }: {email: string, password: string}) => 
    async (dispatch: Dispatch<any>): Promise<void> => {
        try {
            const response: LoginResponse = await axios.post(`${url}/login`, {
                email,
                password
            })
            const { token, user } = response.data
            dispatch(loginSuccess(token, user))
            history.push('/dashboard')
        } catch(error) {
            dispatch(loginFailure('Invalid credentials'))
        }
}

const logout = (): LoginAction => ({
    type: 'LOGOUT'
})

export const startLogout = () =>
    async (dispatch: Dispatch<any>): Promise<void> => {
        const response: Response = await axios.post(`${url}/logout`, null ,getAuthHeader())
        if(response.status === 200) {
            dispatch(logout())
            history.push('/')
        }
    }

interface UserResponse extends Response {
    data: {
        age: number,
        firstName: string,
        lastName: string,
        email: string
    }
}

const userLoadSuccess = (user: User, token: string) => ({
    type: 'USER_LOAD_SUCCESS',
    user,
    token
})

const userLoadFailure = () => ({
    type: 'USER_LOAD_FAILURE'
})

export const startUserLoad = (token: string) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
        try {
            const response: UserResponse  = await axios.get(`${url}/users/me`, getAuthHeader())
            const user: User = response.data
            dispatch(userLoadSuccess(user, token))
        } catch(error) {
            dispatch(userLoadFailure())
        }
    }

const registrationSuccess =  (): RegistrationAction => ({
    type: 'REGISTRATION_SUCCESS'
})

const registrationFailure = (error: string | undefined ): RegistrationAction => ({
    type: 'REGISTRATION_FAILURE',
    error
})

interface UserRegistration extends User {
    password: string
}

export const startRegistration = ({ email, password, firstName, lastName, age }: UserRegistration) => 
    async (dispatch: Dispatch<any>): Promise<void> => {
        try {
            const response: Response = await axios.post(`${url}/signup`, {
                email,
                password,
                firstName,
                lastName,
                age
            })
            dispatch(registrationSuccess())
            history.push('/activation-step-one')
        } catch(error) {
            if(error.response.status === 403) {   
                dispatch(registrationFailure('User already exists!'))
            } else {
                dispatch(registrationFailure('Server error!'))
            }
        }
    }

interface UserEditResponse extends Response {
    data : { 
        firstName: string,
        lastName: string,
        age: number | null
    }
}

const userEditSuccess =  (user: UserEdit): EditAction => ({
    type: 'USER_EDIT_SUCCESS',
    user
})

const userEditFailure = (): EditAction => ({
    type: 'USER_EDIT_FAILURE',
})

export const startProfileEdit = ({ firstName, lastName, age}: UserEdit) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
        try {
            const response: UserEditResponse = await axios.patch(`${url}/users/me`, {
                firstName,
                lastName,
                age
            }, getAuthHeader())
            if(response.status === 200) {
                const updatedUser = response.data
                dispatch(userEditSuccess(updatedUser))
            }
        } catch(error) {
            dispatch(userEditFailure())
        }
    }

export const removeError = (): ErrorAction => ({
    type: 'REMOVE_ERROR'
})

export const setError = (errorText: string): ErrorAction => ({
    type: 'SET_ERROR',
    errorText
})