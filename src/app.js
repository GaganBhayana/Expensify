import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {addExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import {Provider} from 'react-redux';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css'
import './styles/styles.scss';

// this will provide us all the features of redex i.e. store.dipatch etc.
const store = configureStore();


store.dispatch(addExpense({description:'gas Bill',createdAt:1000}));
store.dispatch(addExpense({description:'water Bill',amount:4500}));
store.dispatch(addExpense({description:'Rent', amount:10900}));

// not required now
// store.dispatch(setTextFilter('water'));
// // just to test if everuthing is working
// setTimeout(()=>{    //3 sec later filter will change and things appear accordingly
//     store.dispatch(setTextFilter('bill'));
// },3000);

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses,state.filters);
console.log(visibleExpenses);

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx,document.getElementById('app'));
