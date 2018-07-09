import React from 'react';
import ExpenseForm from './ExpenseForm';
import {addExpense} from '../actions/expenses';
import {connect} from 'react-redux';

const AddExpensePage = (props) =>(
    // passing a funciton onSubmit in the expenseForm
    // we will call this fucntion when form will be submitted
    <div>
        <h1>Add Expense</h1>
        <ExpenseForm
                onSubmit = {(expense) =>{
                    props.dispatch(addExpense(expense));
                    props.history.push('/');                
                }}
        />
    </div>
);

export default connect()(AddExpensePage);