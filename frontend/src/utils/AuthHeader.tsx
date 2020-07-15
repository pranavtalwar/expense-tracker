interface AuthHeader {
    headers: {
        authorization: string
    }
}

export const authHeader: AuthHeader = {
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
}