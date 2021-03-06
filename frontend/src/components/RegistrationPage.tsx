import React, { useState, Dispatch } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { UserRegistration } from '../reduxTypes/AuthTypes'
import { ReduxState } from '../reduxTypes/reduxStateType'
import { startRegistration, setError, removeError } from '../actions/Auth'
import ErrorText from './ErrorText'

interface RegistractionForm {
    firstName: string,
    lastName: string,
    email: string,
    passwordOne: string,
    passwordTwo: string,
    age?: string
}

interface StateProps {
    error: string | undefined
}

interface DispatchProps {
    startRegistration: (userData: UserRegistration) => void,
    setError: (errorText: string) => void,
    removeError: () => void
}

interface Props extends DispatchProps, StateProps {}

const RegistrationPage: React.FC<Props> = ({ startRegistration, setError, removeError, error }) => {
    const [data, setData] = useState<RegistractionForm>({
        firstName: '',
        lastName: '',
        email: '',
        passwordOne: '',
        passwordTwo: '',
        age: ''
    })

    const validation = (data: RegistractionForm): boolean => {
        if (data.passwordOne === data.passwordTwo) {
            return true
        }
        console.log('here')
        setError('Password do not match!')
        setTimeout(() => {
            removeError()
        }, 3000)
        
        return false 
    }

    const createRegistratonPostData = (data:RegistractionForm): UserRegistration => {
        const registrationPostData: UserRegistration = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.passwordOne,
        }
        if(data.age !== undefined && data.age !== null) {
            registrationPostData.age = parseInt(data.age)
        }
        
        return registrationPostData
    }
    
    const onChange =  (e: React.ChangeEvent<HTMLInputElement>): void => {
        setData({ ...data, [e.target.name]: e.target.value}) 
    }

    const onAgeChange =  (e: React.ChangeEvent<HTMLInputElement>): void => {
        const age: string = e.target.value
        if(!age || age.match(/^(100|[0-9]|[1-9][0-9])$/)) {
            setData({ ...data, age: age })
        }  
    }
    
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        if(validation(data)) {
            startRegistration(createRegistratonPostData(data))
            setTimeout(() => {
                removeError()
            }, 3000)
        }

    }

    return (
        <div className="main-page">
            <div className="main-container">
                <h1>Expense Tracker</h1>
                <h3>Registration</h3>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={data.firstName}
                        required={true}
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={data.lastName}
                        onChange={onChange}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={data.email}
                        required={true}
                        onChange={onChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="passwordOne"
                        value={data.passwordOne}
                        required={true}
                        onChange={onChange}
                        minLength={6}
                    />
                    <input
                        type="password"
                        placeholder="Password Again"
                        name="passwordTwo"
                        value={data.passwordTwo}
                        required={true}
                        onChange={onChange}
                        minLength={6}
                    />
                    <input
                        type="text"
                        placeholder="Age"
                        name="age"
                        value={data.age}
                        onChange={onAgeChange}
                    />
                    <ErrorText error={error}/>
                    <button>Submit</button>
                </form>
                <div className="redirect-links">
                    <Link className="redirect-link" to="/forgot-password">Forgot Password?</Link>
                    <Link className="redirect-link" to="/">Login</Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: ReduxState): StateProps => ({
    error: state.auth.error
})

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
    startRegistration: (userData: UserRegistration) => dispatch(startRegistration(userData)),
    setError: (errorText: string) => dispatch(setError(errorText)),
    removeError: () => dispatch(removeError())
})

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage)