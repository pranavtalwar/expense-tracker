import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { ReduxState } from '../reduxTypes/reduxStateType'

interface StateProps {
    isAuthenticated: boolean 
}

interface Props extends StateProps {
    component: any
    path: string
}

export const PrivateRoute: React.FC<Props> = ({ isAuthenticated, component: Component, path, ...rest }) => (
    <Route {...rest} component={(props: any) => (
        isAuthenticated ? (
            <Component {...props}/>
        ) : (
            <Redirect to="/" />
        )
    )} />
)

const mapStateToProps = (state:ReduxState): StateProps => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(PrivateRoute)