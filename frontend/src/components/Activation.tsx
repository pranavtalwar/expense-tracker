import React from 'react'

interface Props {
    heading: string,
    textOne: string,
    textTwo?: string
}

const Activation: React.FC<Props> = ({ heading, textOne, textTwo }) => {
    return (
        <div className="registration-page">
            <div className="registration-container">
                <h1>Expense Tracker</h1>
                <h3>{heading}</h3>
                <div className="registration-message"> 
                    <p>{textOne}</p>
                    {textTwo && <p>{textTwo}</p>}
                    <a className="registration-back-link" href="/">Back</a>
                </div>
            </div>
        </div>
    )
}

export default Activation