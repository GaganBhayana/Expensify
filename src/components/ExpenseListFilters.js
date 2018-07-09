import React from 'react';
import {connect} from 'react-redux';
import {DateRangePicker} from 'react-dates'
import {setTextFilter, sortByDate, sortByAmount, setStartDate,setEndDate} from '../actions/filters';

class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    }
    onDatesChange = ({startDate,endDate}) =>{
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    }
    onFocusChange = (calendarFocused) =>{
        this.setState(()=>({
            calendarFocused
        })) 
    }
    render(){
        return (
            <div>
                <input type="text" value={this.props.filters.text} onChange={(e)=>{
                    this.props.dispatch(setTextFilter(e.target.value));
                    // now everytime when the value of input is changed we would 
                    // add that using dispatch
                }}/>
                <select onChange={(e)=>{
                    if(e.target.value=== "date")
                        this.props.dispatch(sortByDate());
                    else if(e.target.value=="amount")
                        this.props.dispatch(sortByAmount());
                }}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>    
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    endDate = {this.props.filters.endDate}
                    onDatesChange = {this.onDatesChange}
                    focusedInput = {this.state.calendarFocused}
                    onFocusChange = {this.onFocusChange}
                    numberOfMonths = {1}
                    isOutsideRange = {()=>false}
                    showClearDates={true}
                />
            </div>
        )
    }
}
 

const mapStateToProps = (state) =>{
    return{
        filters: state.filters
    }
}

// Note : we do not need mapStateToProps argument to connect but we need it to access the
// dispatch function.
export default connect(mapStateToProps)(ExpenseListFilters);