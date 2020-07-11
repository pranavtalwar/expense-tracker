import { LoginAction, RegistrationAction, User } from '../reduxTypes/AuthTypes'
import { history } from '../router/AppRouter'
import { Dispatch } from "react"
import axios from "axios"
import { url } from '../constants'

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

const registrationSuccess =  (token: string, user: User): RegistrationAction => ({
    type: 'REGISTRATION_SUCCESS',
    user,
    token
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
            const response: LoginResponse = await axios.post(`${url}/signup`, {
                email,
                password,
                firstName,
                lastName,
                age
            })
            const { user, token } = response.data
            dispatch(registrationSuccess(token, user))
            history.push('/dashboard')
        } catch(error) {
            if(error.response.status === 403) {   
                dispatch(registrationFailure('User already exists!'))
            } else {
                dispatch(registrationFailure('Server error!'))
            }
        }
    }


