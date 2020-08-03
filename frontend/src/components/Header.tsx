import React, { Dispatch } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogout } from '../actions/Auth'

interface DispatchProps {
    startLogout: () => void
}

interface Props extends DispatchProps {}

const Header: React.FC<Props> = ({ startLogout }) => (
    <header className="header"> 
        <div className="content-container">
            <div className="header-content">
                <Link className="header-title" to="/dashboard">
                    <h1>Expense Tracker</h1>
                </Link>
                <button className="button button-link" onClick={startLogout}>Logout</button>
            </div>
        </div>
    </header>
)

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header)