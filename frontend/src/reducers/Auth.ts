import { Auth, AuthAction, User } from "../reduxTypes/AuthTypes"

const authReducerDefaultState: Auth = {
    token: localStorage.getItem('token') || undefined,
    isAuthenticated: undefined,
    user: null,
    error: undefined,
}

const authReducer = (state: Auth = authReducerDefaultState, action: AuthAction): Auth => {
    switch(action.type){
        case 'LOGIN_SUCCESS':
            if(action.token) {
                localStorage.setItem('token', action.token)
                return {
                    ...state,
                    token: action.token,
                    isAuthenticated: true,
                    user: (action.user as User),
                    error: undefined,
                }
            }  
        case 'REGISTRATION_SUCCESS':
            if(action.token) {
                localStorage.setItem('token', action.token)
                return {
                    ...state,
                    token: action.token,
                    isAuthenticated: true,
                    user: (action.user as User),
                    error: undefined,
                }
            }
        case 'LOGIN_FAILURE':
            localStorage.removeItem('token')
            if(action.error) {
                return {
                    ...state,
                    token: undefined,
                    isAuthenticated: false,
                    user: null,
                    error: action.error
                }   
            }
            
        case 'REGISTRATION_FAILURE':
            localStorage.removeItem('token')
            console.log('error')
            if(action.error) {
                return {
                    ...state,
                    token: undefined,
                    isAuthenticated: false,
                    user: null,
                    error: action.error
                }   
            }
        default:
            return state
    }
}

export default authReducer