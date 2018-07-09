import React from 'react';
import {connect} from 'react-redux';
import {setTextFilter, sortByDate, sortByAmount} from '../actions/filters';

const ExpenseListFilters = (props) =>(
    <div>
        <input type="text" value={props.filters.text} onChange={(e)=>{
            props.dispatch(setTextFilter(e.target.value));
            // now everytime when the value of input is changed we would 
            // add that using dispatch
        }}/>
        <select onChange={(e)=>{
            if(e.target.value=== "date")
                props.dispatch(sortByDate());
            else if(e.target.value=="amount")
                props.dispatch(sortByAmount());
        }}>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
        </select>
    </div>
);

const mapStateToProps = (state) =>{
    return{
        filters: state.filters
    }
}

// Note : we do not need mapStateToProps argument to connect but we need it to access the
// dispatch function.
export default connect(mapStateToProps)(ExpenseListFilters);