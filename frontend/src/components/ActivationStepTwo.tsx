import React, { useState, useEffect } from 'react'
import axios from 'axios';
import  Loader from 'react-loader';
import Activation from './Activation'
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
                const response = await axios.post(`${url}/activation/${token}`)
                console.log(response)
                setIsLoading(!isLoading)
                if(response.status !== 201) {
                    throw new Error('' + response.status)
                } 
            } catch(error) {
                console.log(error.message)
                setError(error.message)
            }      
        }
        activation()
    }, [])

    return (
        <Loader loaded={!isLoading}>
            {!error ?
                <Activation 
                    heading="Account activated!"
                    textOne="Click to go back to the Login page to login with your credentials"
                /> :
                <Activation 
                    heading="Error!"
                    textOne="Looks like something went wrong"
                    textTwo="The link sent to you might have expired"
                />
            }
        </Loader>
       
    )
}

export default ActivationStepTwo