import React from 'react'
import InfoPage from './InfoPage'

const PasswordChanged: React.FC = () => {
    return (
        <div>
            <InfoPage 
                heading="Password Changed!"
                textOne="Login again to use your changed password"
            />
        </div>
       
    )
}

export default PasswordChanged