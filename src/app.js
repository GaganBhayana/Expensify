import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
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
        404 Page not found
    </div>
);
const routes = (
    <BrowserRouter> 
    <Switch>
        <Route path="/" component={ExpenseDashboardPage} exact={true}/>
        <Route path="/create" component={AddExpensePage} exact={true}/>
        <Route path="/edit" component={EditExpensePage} exact={true}/>
        <Route path="/help" component={HelpPage} exact={true}/>    
        <Route component={NotFoundPage} exact={true}/>    
    </Switch>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));
