import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import  Loader from 'react-loader';
import InfoPage from './InfoPage'
import { url } from '../constants'
import { RouteComponentProps } from 'react-router-dom'

interface MatchParams {
    token: string
}

interface Props extends RouteComponentProps<MatchParams> {}

const ActivationStepTwo: React.FC<Props> = ({ match }) => {
    const { token } : { token: string } = match.params

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<undefined | String>(undefined)

    useEffect(() => {
        const activation = async() => {
            console.log('once')
            try {
                const response: Response = await axios.post(`${url}/activation/${token}`)
                setIsLoading(!isLoading)
                if(response.status !== 201) {
                    throw new Error('' + response.status)
                } 
            } catch(error) {
                setError(error.message)
            }      
        }
        activation()
    }, [])

    return (
        <Loader loaded={!isLoading}>
            {!error ?
                <div>
                    <InfoPage 
                        heading="Account activated!"
                        textOne="Click to go back to the Login page to login with your credentials"
                    />
                </div>
                :
                <div>
                    <InfoPage 
                        heading="Error!"
                        textOne="Looks like something went wrong"
                        textTwo="The link sent to you might have expired"
                    />
                </div>
                
            }
        </Loader>
       
    )
}

export default ActivationStepTwo