import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import avatar from './avatar.png'
import { ReduxState } from '../reduxTypes/reduxStateType'

interface StateProps {
    firstName: string | undefined
    lastName: string | undefined ,
    age?: number | undefined
    email: string | undefined
}

interface Props extends StateProps {}


const Profile: React.FC<Props> = ({ firstName, lastName, age, email }) => {
    return (
        <div>
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header-title">Profile</h1>
                    <Link className="redirect-link profile-link" to="/editprofile">Edit Profile</Link>
                </div>
            </div>
            <div className="profile">
                <div className="profile-card">
                    <img src={avatar}/>
                    <div className="profile-details">
                        <table className="center">
                            <tr>
                                <td>
                                    <h3>First Name:</h3>
                                </td>
                                <td>
                                    <h3>{firstName}</h3>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h3>Last Name:</h3>
                                </td>
                                <td>
                                    <h3>{lastName}</h3>
                                </td>
                            </tr>
                            {age && <tr>
                                <td>
                                    <h3>Age:</h3>
                                </td>
                                <td>
                                    <h3>{age}</h3>
                                </td>
                            </tr>}
                            <tr>
                                <td>
                                    <h3>Email:</h3>
                                </td>
                                <td>
                                    <h3>{email}</h3>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>    
            </div>     
        </div>
    )
}

const mapStateToProps = (state: ReduxState): StateProps => {
    return {
        firstName: state.auth.user?.firstName,
        lastName: state.auth.user?.lastName,
        email: state.auth.user?.email,
        age: state.auth.user?.age
    }
}

export default connect(mapStateToProps)(Profile)