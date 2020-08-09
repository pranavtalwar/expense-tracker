import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import Login from '../components/LoginPage'
import Registration from '../components/RegistrationPage'
import AddExpense from '../components/AddExpense'
import EditExpense from '../components/EditExpense'
import ExpenseDashboard from '../components/ExpenseDashboard'
import NotFoundPage from '../components/NotFoundPage'
import PrivateRoute from './PrivateRoute'
import ActivationStepOne from '../components/ActivationStepOne'
import ActivationStepTwo from '../components/ActivationStepTwo'
import ForgotPassword from '../components/ForgotPassword'
import EmailSent from '../components/EmailSent'
import PasswordChange from '../components/PasswordChange'
import PasswordChanged from '../components/PasswordChanged'
import Profile from '../components/Profile'

export const history = createHistory()

const AppRouter: React.FC = () => (
    <div>
        <Router history={history}>
            <div>
                <Switch>
                    <Route path="/" component={Login} exact={true}/>
                    <Route path="/registration" component={Registration}/>
                    <Route path="/activation-step-one" component={ActivationStepOne} exact={true}/>
                    <Route path="/activation-step-two/:token" component={ActivationStepTwo} exact={true}/>
                    <Route path="/forgot-password" component={ForgotPassword} />
                    <Route path="/password-recovery/:token" component={PasswordChange} exact={true}/>
                    <Route path="/password-changed" component={PasswordChanged} exact={true}/>
                    <Route path='/email-sent' component={EmailSent} />
                    <PrivateRoute path="/dashboard" component={ExpenseDashboard}/>
                    <PrivateRoute path="/create" component={AddExpense}/>
                    <PrivateRoute path="/edit/:id" component={EditExpense}/>
                    <PrivateRoute path="/profile" component={Profile} />
                    <Route component={NotFoundPage}/>
                </Switch>
            </div>
        </Router>
    </div>
)

export default AppRouter