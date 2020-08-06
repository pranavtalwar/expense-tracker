import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
    heading: string,
    textOne: string,
    textTwo?: string
}

const Activation: React.FC<Props> = ({ heading, textOne, textTwo }) => {
    return (
        <div className="main-page">
            <div className="main-container">
                <h1>Expense Tracker</h1>
                <h3>{heading}</h3>
                <div className="main-message"> 
                    <p>{textOne}</p>
                    {textTwo && <p>{textTwo}</p>}
                    <Link to="/" className="redirect-link">Back</Link>
                </div>
            </div>
        </div>
    )
}

export default Activation