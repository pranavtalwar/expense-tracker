import React, { Dispatch, ChangeEvent } from 'react'
import { Link, RouteComponentProps, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogout } from '../actions/Auth'

interface DispatchProps {
    startLogout: () => void
}

interface Props extends DispatchProps {}

const Header: React.FC<Props> = ({ startLogout }) => {
    const history = useHistory()

    const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        history.push(`/${e.target.value}`)
    }

    return (
        <header className="header"> 
            <div className="content-container">
                <div className="header-content">
                    <Link className="header-title" to="/dashboard">
                        <h1>Expense Tracker</h1>
                    </Link>
                    <div>
                        <select className="menu" onChange={handleChange}>
                            <option className="menu-option">Menu</option>
                            <option 
                                className="menu-option"
                                value="dashboard"
                            >
                                Dashboard
                            </option>
                            <option
                                value="create"
                                className="menu-option"
                            >
                                Add Expense
                            </option>
                            <option
                                value="profile"
                                className="menu-option"
                            >
                                Profile
                            </option>
                        </select>
                        <button className="button button-link" onClick={startLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </header>
    )
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header)