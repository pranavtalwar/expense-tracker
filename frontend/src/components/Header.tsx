import React, { Dispatch } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogout } from '../actions/Auth'
import '../styles/login.scss'

interface DispatchProps {
    startLogout: () => void
}

interface Props extends DispatchProps {}

const Header: React.FC<Props> = ({ startLogout }) => (
    <header>
        <h1>Expense Tracker</h1>
        <NavLink to="/dashboard" activeClassName="is-active">Dashboard</NavLink>
        <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
        <button onClick={startLogout}>Logout</button>
    </header>
)

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header)