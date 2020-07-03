import React, { useState } from 'react'
import axios from 'axios'
import '../styles/login.scss'

const url = 'http://localhost:5000/login'

const LoginPage : React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        if(email !== '' && password !== '') {
            let response
            try {
                response = await axios.post(url, {
                    email,
                    password
                })
                console.log(response)
            } catch(error) {
                console.log(response)
                console.log(error)
            }
    
            
        }
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
                    <button type="submit">Login</button>
                </form>
           </div>
       </div>
       
    )
}

export default LoginPage