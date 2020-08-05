interface AuthHeader {
    headers: {
        authorization: string
    }
}

export default (): AuthHeader => {
    return {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
}