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

export const history = createHistory()

const AppRouter: React.FC = () => (
    <div>
        <Router history={history}>
            <div>
                <Switch>
                    <Route path="/" component={Login} exact={true}/>
                    <Route path="/registration" component={Registration}/>
                    <PrivateRoute path="/dashboard" component={ExpenseDashboard}/>
                    <PrivateRoute path="/create" component={AddExpense}/>
                    <PrivateRoute path="/edit/:id" component={EditExpense}/>
                    <Route path="/activation-step-one" component={ActivationStepOne} exact={true}/>
                    <Route path="/activation-step-two/:token" component={ActivationStepTwo} exact={true}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </div>
        </Router>
    </div>
)

export default AppRouter