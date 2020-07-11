import React from 'react'

interface Props {
    error: string | undefined
}

const ErrorText: React.FC<Props> = ({ error }) => (
    <React.Fragment>
        {error && <p style={{ color: 'red'}}>{error}</p>}
    </React.Fragment>
)

export default ErrorText