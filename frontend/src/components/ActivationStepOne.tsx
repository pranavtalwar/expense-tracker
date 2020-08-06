import React from 'react'
import { Link } from 'react-router-dom'
import InfoPage from './InfoPage'

const ActivationStepOne: React.FC = () => {
    return (
        <div>
            <InfoPage 
                heading="Email Sent!"
                textOne="An email has been to the account you used for registering for this app."
                textTwo="Click on the link to acitvate your account."
            />
        </div>
       
    )
}

export default ActivationStepOne