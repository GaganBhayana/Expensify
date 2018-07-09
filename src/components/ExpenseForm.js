import React from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize'

// const now = moment();//return current time
// console.log(now);

export default class ExpenseForm extends React.Component{
    //  here it is better to maintain a local component state to tract tha changes for all of the 
    // inputs and only when the user actually submits the form we willsend to redux
    state = {
        description: "",
        note: "",
        amount: "",
        createdAt: moment(),
        calendarFocused:false,   //need to keep track of it for moment
        error: ""
    }; 
    onDescriptionChange = (e)=>{
        const description = e.target.value;
        this.setState(()=>({description:description}));
    };
    onAmountChange = (e) =>{
        const amount = e.target.value;
        // using regular expression
        // only adding vaid number values with at max 2 decimmal points
        // !amount is added so that when a user wants to delete an amount he is able 
        //to do so and the state gets updated, otherwise the value of input box won't change
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/))
        {
            this.setState(()=>({amount}));
        }
    }
    onDateChange = (createdAt) =>{
        if(createdAt)
            this.setState(()=>({createdAt}))
    }
    onFocusChange = ({focused}) =>{
        this.setState(()=>({calendarFocused:focused}));
        console.log(focused);
    }
    onNoteChange = (e) =>{
        const note = e.target.value;
        this.setState(()=>({note}))
    }
    onSubmit = (e) =>{
        e.preventDefault();
        if(!this.state.description || !this.state.amount)
        {
            //Set error state
            this.setState(()=>({error:'please provide description and amount'}));
        }
        else{
            this.setState(()=>({error:""}));
            this.props.onSubmit({
                description:this.state.description,
                amount: parseFloat(this.state.amount,10)*100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            })
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit = {this.onSubmit}>
                    <input 
                        type="text" 
                        placeholder="Description" 
                        autoFocus
                        value = {this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                        type="text" 
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange = {this.onAmountChange}
                    />
                    <SingleDatePicker
                        date = {this.state.createdAt}
                        onDateChange = {this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange = {this.onFocusChange}
                        numberOfMonths = {1}
                        isOutsideRange = {()=>false}// now all dates will be available
                    />
                    <textarea 
                        placeholder="Add a note for your expense"
                        value = {this.state.note}
                        onChange = {this.onNoteChange}    
                    />  
                    <button>Add Expense</button>  
                </form>
            </div>
        )
    }
}