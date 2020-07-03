import React, { useState } from 'react'
import axios from 'axios'
import '../styles/registration.scss'

interface RegistractionForm {
    firstName: string,
    lastName: string,
    email: string,
    passwordOne: string,
    passwordTwo: string,
    age?: number | undefined
}

interface RegistrationPostData {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    age?: number
}

const url = 'http://localhost:5000/signup'

const RegistrationPage: React.FC = () => {
    const [data, setData] = useState<RegistractionForm>({
        firstName: '',
        lastName: '',
        email: '',
        passwordOne: '',
        passwordTwo: '',
        age: undefined
    })

    const validation = (data: RegistractionForm): boolean => {
        if (data.passwordOne === data.passwordTwo) {
            return true
        }
        alert('Passwords dont match')
        return false 
    }

    const createRegistratonPostData = (data:RegistractionForm): RegistrationPostData => {
        const registrationPostData: RegistrationPostData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.passwordOne,
        }
        if(data.age !== undefined) {
            registrationPostData.age = data.age
        }
        
        return registrationPostData
    }
    
    const onChange =  (e: React.ChangeEvent<HTMLInputElement>): void => {
        setData({ ...data, [e.target.name]: e.target.value}) 
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        if(validation(data)) {
            
            let response
            try {
                response = await axios.post(url, createRegistratonPostData(data))
                console.log(response)
            } catch(error) {
                console.log(response)
                console.log(error)
            }
        }
    }

    return (
        <div className="registration-page">
            <div className="registration-container">
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
                    />
                    <input
                        type="password"
                        placeholder="Password Again"
                        name="passwordTwo"
                        value={data.passwordTwo}
                        required={true}
                        onChange={onChange}
                    />
                    <input
                        type="number"
                        placeholder="Age"
                        name="age"
                        value={data.age}
                        onChange={onChange}
                    />
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default RegistrationPage