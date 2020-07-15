import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import Login from '../components/LoginPage'
import Registration from '../components/RegistrationPage'
import Header from '../components/Header'
import AddExpense from '../components/AddExpense'
import EditExpense from '../components/EditExpense'
import ExpenseDashboard from '../components/ExpenseDashboard'
import HelpPage from '../components/HelpPage'
import NotFoundPage from '../components/NotFoundPage'
import PrivateRoute from './PrivateRoute'

export const history = createHistory()

const AppRouter: React.FC = () => (
    <div>
        <Router history={history}>
            <div>
                <Header />
                <Switch>
                    <Route path="/" component={Login} exact={true}/>
                    <Route path="/registration" component={Registration}/>
                    <PrivateRoute path="/dashboard" component={ExpenseDashboard}/>
                    <PrivateRoute path="/create" component={AddExpense}/>
                    <PrivateRoute path="/edit/:id" component={EditExpense}/>
                    <Route path="/help" component={HelpPage}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </div>
        </Router>
    </div>
)

export default AppRouter