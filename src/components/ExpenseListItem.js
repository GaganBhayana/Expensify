
import React from 'react'
import {connect} from 'react-redux';
import RemoveExpense, { removeExpense } from '../actions/expenses';

const ExpenseListItem = ({dispatch,id,description,amount,createdAt}) =>{// taking props
   // here we are not directly taking evrerything inside props but destructuring it
    return (
        <div>
            <h3>{description}</h3>
            <p>{amount} - {createdAt}</p>
            <button onClick={()=>{
                dispatch(removeExpense({id:id}));
            }}>Remove</button>
        </div>
    )
}

export default connect()(ExpenseListItem);