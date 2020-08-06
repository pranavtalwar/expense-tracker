import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { RouteComponentProps } from 'react-router-dom'
import { url } from '../constants'

interface MatchParams {
    token: string
}

interface Props extends RouteComponentProps<MatchParams> {}

const ChangePassword : React.FC<Props> = ({ history, match }) => {

    const { token } : { token: string } = match.params 

    const [passwordOne, setPasswordOne] = useState<string>('')
    const [passwordTwo, setPasswordTwo] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        if(passwordOne !== passwordTwo) {
            return alert('Passwords don\'t match!')
        }

        
        const response: Response = await axios.post(`${url}/change-password/${token}`, { password: passwordOne })
        if(response.status === 200) {
            history.push('/password-changed')
        }    
    }

    return (
       <div className="main-page">
            <div className="main-container">
                <h1>Expense Tracker</h1>
                <h3>Change Password</h3>
                <form
                    onSubmit={handleSubmit} 
                >
                    <input 
                        type="password"
                        placeholder="Password"
                        required={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordOne(e.target.value)}
                    />
                    <input 
                        type="password"
                        placeholder="Re-enter Password"
                        required={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordTwo(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
           </div>
       </div>
       
    )
}

export default ChangePassword