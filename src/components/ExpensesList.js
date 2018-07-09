import React from 'react';
import {connect} from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses'; 

const ExpenseList = (props) =>(
    <div>
    
        <h1>Expense List</h1> 
        {props.expenses.map((expense) => {
            return <ExpenseListItem key={expense.id} {...expense} />;
          })}   
    </div>
);
// {props.expenses.map((expense)=>{
//     return <ExpenseListItem {...expense}/>
// })}
const mapStateToProps = (state)=> {
    return{
        // getiing back only teh filtered values
        expenses: selectExpenses(state.expenses,state.filters)
        // expenses: state.expenses, // Key value pairs
        // filters: state.filters
    };
};
export default connect(mapStateToProps)(ExpenseList); 
