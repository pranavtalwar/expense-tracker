import React, { useState, Dispatch } from 'react'
import { connect } from 'react-redux'
import '../styles/login.scss'
import { startLogin } from '../actions/Auth'
import ErrorText from './ErrorText'
import { ReduxState } from '../reduxTypes/reduxStateType' 
import { Redirect } from 'react-router-dom'

interface StateProps {
    error: string | undefined
    isAuthenticated: boolean
}

interface DispatchProps {
    startLogin: (email: string, password: string) => void
}

interface Props extends StateProps, DispatchProps {}


const LoginPage : React.FC<Props> = ({ startLogin, error, isAuthenticated }) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        if(email !== '' && password !== '') {
          startLogin(email, password)      
        }
    }

    if(isAuthenticated) {
        return <Redirect to="/dashboard"/>
    }

    return (
       <div className="login-page">
            <div className="login-container">
                <h1>Expense Tracker</h1>
                <h3>Sign In</h3>
                <form 
                    onSubmit={handleSubmit}
                >
                    <input 
                        type="email"
                        placeholder="Email"
                        value={email}
                        required={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password"
                        placeholder="Password"
                        value={password}
                        required={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    /> 
                    <ErrorText error={error} />
                    <button type="submit">Login</button>
                </form>
           </div>
       </div>
       
    )
}

const mapStateToProps = (state: ReduxState): StateProps => ({
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
    startLogin: (email: string, password: string) => dispatch(startLogin({ email, password }))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)