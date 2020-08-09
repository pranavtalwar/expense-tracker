import React, { useState, Dispatch } from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { startProfileEdit } from '../actions/Auth'
import { ReduxState } from '../reduxTypes/reduxStateType'

interface StateProps {
    firstName: string | undefined,
    lastName: string | undefined,
    age?: string | undefined
}

interface DispatchProps {
    startProfileEdit: (firstName: string, lastName: string, age: number | null) => void
}

interface EditUser {
    firstName: string | undefined ,
    lastName: string | undefined,
    age: string | undefined
}

interface Props extends StateProps, DispatchProps, RouteComponentProps<any> {}


const ExpenseForm: React.FC<Props> = ({ firstName, lastName, age, startProfileEdit, history }) => {
    const [data, setData] = useState<EditUser>({
        firstName: firstName,
        lastName: lastName,
        age: age? age : undefined
    })

    const [error, setError] = useState<string>('')
    
    const onChange =  (e: React.ChangeEvent<any>): void => {
        setData({ ...data, [e.target.name]: e.target.value})
    }

    const onAgeChange =  (e: React.ChangeEvent<HTMLInputElement>): void => {
        const age: string = e.target.value
        if(!age || age.match(/^(100|[0-9]|[1-9][0-9])$/)) {
            setData({ ...data, age: age })
        }  
    }


    const validateData = () => {
        if(data.firstName === '' || data.lastName === '') {
            setError('First Name and Last Name cannot be empty')
            return false
        }
        return true
    } 

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        if(!validateData()) {
            console.log('error')
        }
        const { firstName, lastName } = data
        const age = data.age ? parseInt(data.age) : null 
        startProfileEdit(firstName as string, lastName as string, age)
        history.push('/profile')
    }

    return (
        <div>
            <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header-title">Edit Profile</h1>
                        <Link className="redirect-link profile-link" to="/profile">Profile</Link>
                    </div>
            </div>
            <div className="content-container">
                <form 
                    className="form"
                    onSubmit={handleSubmit}
                >
                    {error && <p className="form-error">{error}</p>}
                    <input
                        className="text-input"
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={data.firstName}
                        autoFocus
                        onChange={onChange}
                    />

                    <input
                        className="text-input"
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={data.lastName}
                        autoFocus
                        onChange={onChange}
                    />
                    <input
                        className="text-input"
                        type="text"
                        placeholder="Age"
                        name="age"
                        value={data.age}
                        autoFocus
                        onChange={onAgeChange}
                    />
                    <div>
                        <button className="button">Update Profile</button>
                    </div>
                        
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state: ReduxState): StateProps => ({
    firstName: state.auth.user?.firstName,
    lastName: state.auth.user?.lastName,
    age: state.auth.user?.age?.toString()
    
})

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
    startProfileEdit: (firstName: string, lastName: string, age: number | null) => dispatch(startProfileEdit({ firstName, lastName, age })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm)