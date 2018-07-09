import React from 'react';
import ExpenseForm from './ExpenseForm';
import {removeExpense,editExpense} from '../actions/expenses';
import {connect} from 'react-redux';

const EditExpensePage = (props) =>(
    <div>
        <h1>Edit Expense</h1>
        <ExpenseForm 
            onSubmit={(expense)=> {
                props.dispatch(editExpense(props.expense.id,expense));
                props.history.push('/');
            }}
            expense={props.expense} 
        />      
        <button onClick={(expense)=>{
            props.dispatch(removeExpense({id:props.expense.id}));
            props.history.push('/');
        }}>Remove</button>
    </div>
);

// Now our component above ha access to all the items 
// inside the expense with matching id
const mapStateToProps = (state,props)=>{
    return {
        expense:state.expenses.find((expense)=>{
            return (expense.id === props.match.params.id)
        })
    }
}
export default connect(mapStateToProps)(EditExpensePage);