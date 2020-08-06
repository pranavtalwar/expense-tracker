import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { RouteComponentProps } from 'react-router-dom'
import { url } from '../constants'

interface Props extends  RouteComponentProps<any> {}

const ForgotPassword : React.FC<Props> = ({ history }) => {

    const [email, setEmail] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        const response: Response = await axios.post(`${url}/forgot-password`, { email })
        if(response.status === 200) {
            history.push('/email-sent')
        }
    }

    return (
       <div className="main-page">
            <div className="main-container">
                <h1>Expense Tracker</h1>
                <h3>Forgot Password</h3>
                <form
                    onSubmit={handleSubmit} 
                >
                    <input 
                        type="email"
                        placeholder="Email"
                        required={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
                <div className="redirect-links">
                    <Link className="redirect-link" to="/">Login</Link>
                    <Link className="redirect-link" to="/registration">Register</Link>
                </div>
           </div>
       </div>
       
    )
}

export default ForgotPassword