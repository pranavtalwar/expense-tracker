import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import avatar from './avatar.png'
import { url } from '../constants'
import { ReduxState } from '../reduxTypes/reduxStateType'
import  getAuthHeader from '../utils/AuthHeader'
import { setError } from '../actions/Auth'
import ErrorText from './ErrorText'

interface StateProps {
    firstName: string | undefined
    lastName: string | undefined ,
    age?: number | undefined
    email: string | undefined
}

interface Props extends StateProps {}


const Profile: React.FC<Props> = ({ firstName, lastName, age, email }) => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [image, setImage] = useState<string>('')
    const [isUploaded, setIsUploaded] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    useEffect (() => {
        const getProfileImage = async () => {
            const response = await axios.get(`${url}/users/me/avatar`, getAuthHeader())
            setImage(response.data)
        }

        getProfileImage()
    }, [isUploaded])

    

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if(!e.target.files) {
            return;
        }
        setSelectedFile(e.target.files[0])
    }

    const handleFileUpload = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
        if(!selectedFile) {
            return
        }
        const fd = new FormData()
        fd.append('avatar', selectedFile)
        try {
            const response = await axios.post(`${url}/users/me/avatar`, fd, getAuthHeader())
            if(response.status === 200) {
                setIsUploaded(true)
                setSelectedFile(null)
            }
        } catch(error) {
            setSelectedFile(null)
            setError('Image could no be uploaded!')
            setTimeout(() => {
                setError('')
            },3000)
        }
    }

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
                    <div className="profile-picture">
                        {!image ?
                            <img src={avatar}/>
                            :
                            <img 
                                src={`data:image/jpeg;base64,${image}`}
                            />
                        }
                    </div>
                    <label className="custom-file-upload">
                        <input 
                            type="file"
                            accept="image/x-png,image/gif,image/jpeg"
                            onChange={handleFileSelect}
                        />
                        Choose File
                    </label>
                    <button 
                        className="button"
                        onClick={handleFileUpload}
                    >
                        Upload Image
                    </button>
                    {selectedFile && <p>File Selected: {selectedFile.name}</p>}
                    {error && <ErrorText error={error} />}
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