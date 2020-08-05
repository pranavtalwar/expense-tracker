import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface MatchParams {}

interface Props extends RouteComponentProps<MatchParams> {}

const RegistrationStepOne: React.FC<Props> = ({ history }) => {
    return (
        <div className="registration-page">
            <div className="registration-container">
                <h1>Expense Tracker</h1>
                <h3>Email Sent!</h3>
                <div className="registration-message"> 
                    <p>An email has been to the account you used for registering for this app.</p>
                    <p>Click on the click to acitvate your account.</p>
                    <a className="registration-back-link" href="/">Back</a>
                </div>
                
            </div>
        </div>
    )
}

export default RegistrationStepOne