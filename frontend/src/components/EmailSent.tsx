import React from 'react'
import { Link } from 'react-router-dom'
import InfoPage from './InfoPage'

const EmailSent: React.FC = () => {
    return (
        <div>
            <InfoPage 
                heading="Email Sent!"
                textOne="An email has been to the account you entered if it exists."
                textTwo="Click on the link in the email to reset your password."
            />
        </div>
       
    )
}

export default EmailSent