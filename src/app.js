import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import 'normalize.css/normalize.css'
import './styles/styles.scss';

const ExpenseDashboardPage = () =>(
    <div>
        This is from my dashboard component
    </div>
);

const AddExpensePage = () =>(
    <div>
        This is from my Create page
    </div>
);
const EditExpensePage = () =>(
    <div>
        This is from my edit page
    </div>
);
const HelpPage = () =>(
    <div>
        This is from help page
    </div>
);
const NotFoundPage = () =>(
    <div>
        404 Page not found <Link to="/">Go Home</Link>
    </div>
);
const Header = () =>(
    <header>
        <h1>Expensify</h1>
        <NavLink to='/' activeClassName="isActive" exact={true}>Dashboard</NavLink>
        <NavLink to='/create' activeClassName="isActive">Create</NavLink>
        <NavLink to='/edit' activeClassName="isActive">Edit</NavLink>
        <NavLink to='/help' activeClassName="isActive">Help</NavLink>
    </header>
)
const routes = (
    <BrowserRouter> 
    <div>
        <Header />        
        <Switch>
            <Route path="/" component={ExpenseDashboardPage} exact={true}/>
            <Route path="/create" component={AddExpensePage} />
            <Route path="/edit" component={EditExpensePage} />
            <Route path="/help" component={HelpPage} />    
            <Route component={NotFoundPage}/>    
        </Switch>
    </div>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));
