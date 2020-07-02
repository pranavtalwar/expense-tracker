import React, { useState } from 'react'
import '../styles/registration.scss'

interface RegistractionForm {
    firstName: string,
    lastName: string,
    email: string,
    passwordOne: string,
    passwordTwo: string,
    age?: number | undefined
}

const RegistrationPage: React.FC = () => {
    const [data, setData] = useState<RegistractionForm>({
        firstName: '',
        lastName: '',
        email: '',
        passwordOne: '',
        passwordTwo: '',
        age: undefined
    })
    return (
        <div className="registration-page">
            <div className="registration-container">
                <h1>Expense Tracker</h1>
                <h3>Registration</h3>
                <form>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={data.firstName}
                        required={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, firstName: e.target.value})}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={data.lastName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, lastName: e.target.value})}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={data.email}
                        required={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, email: e.target.value})}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={data.passwordOne}
                        required={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, passwordOne: e.target.value})}
                    />
                    <input
                        type="password"
                        placeholder="Password Again"
                        value={data.passwordTwo}
                        required={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, passwordTwo: e.target.value})}
                    />
                    <input
                        type="number"
                        placeholder="Age"
                        value={data.age}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, age: parseInt(e.target.value)})}
                    />
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default RegistrationPage