import React, { useState } from 'react'
import '../styles/login.scss'


const LoginPage : React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    return (
       <div className="login-page">
            <div className="login-container">
                <h1>Expense Tracker</h1>
                <h3>Sign In</h3>
                <form 
                    onSubmit={(e) => e.preventDefault()}
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