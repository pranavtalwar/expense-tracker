import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from '../components/LoginPage'
import Registration from '../components/RegistrationPage'
import Header from '../components/Header'
import AddExpense from '../components/AddExpense'
import EditExpense from '../components/EditExpense'
import ExpenseDashboard from '../components/ExpenseDashboard'
import HelpPage from '../components/HelpPage'
import NotFoundPage from '../components/NotFoundPage'


const AppRouter: React.FC = () => (
    <div>
        <BrowserRouter>
            <div>
                {/* {<Header />} */}
                <Switch>
                    <Route path="/" component={Login} exact={true}/>
                    <Route path="/registration" component={Registration}/>
                    <Route path="/dashoboard" component={ExpenseDashboard}/>
                    <Route path="/create" component={AddExpense}/>
                    <Route path="/edit/:id" component={EditExpense}/>
                    <Route path="/help" component={HelpPage}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </div>
        </BrowserRouter>
    </div>
)

export default AppRouter