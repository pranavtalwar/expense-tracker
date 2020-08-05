import React from 'react'
import Activation from './Activation'

const ActivationStepOne: React.FC = () => {
    return (
       <Activation 
            heading="Email Sent!"
            textOne="An email has been to the account you used for registering for this app."
            textTwo="Click on the click to acitvate your account."
       />
    )
}

export default ActivationStepOne