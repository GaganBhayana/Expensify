// this file is the compele code which has been refactored into seperate components.
//this file is not needed.
import {createStore,combineReducers} from 'redux';
import uuid from 'uuid';

// Add expense generator
const addExpense = ({description="", note="",amount=0, createdAt=0}={}) =>({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
})
// Remove expense Generator
const removeExpense = ({id={}}) =>({
    type:'REMOVE_EXPENSE',
    id
})
// Edit Expense generator
const editExpense = (id,updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})
// Set text Filter
const setTextFilter = (text="")=>({
    type: 'SET_TEXT_FILTER',
    text
})
// sort by amount
const  sortByAmount = () =>({
    type: 'SORT_BY_AMOUNT'
})
// sort by date
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})
// Set START date
const setStartDate = (date=undefined) =>({
    type: 'SET_START_DATE',
    date
})
// Set END date
const setEndDate = (date=undefined) =>({
    type: 'SET_END_DATE',
    date
})

// Expense reducer
const expenseReducerDefaultState = [];

const expensesReducer = (state = expenseReducerDefaultState,action)=>{
    switch(action.type){
        case 'ADD_EXPENSE': 
                return [
                    ...state,
                    action.expense
                ]
        case 'REMOVE_EXPENSE':
                return state.filter(({id})=>{
                    return id!==action.id
                })
        case 'EDIT_EXPENSE':
                return state.map((expense)=>{
                    if(expense.id === action.id)
                    {
                        return {
                            ...expense,//first getting the original values
                            ...action.updates // now overriding the values with new values
                        }
                    }
                    else
                        return expense
                })
        default: return state;
    }
}
//Filter reducer
const filtersReducersDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}
const filtersReducer = (state = filtersReducersDefaultState,action)=>{
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text   //overriding the text property
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.date
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.date
            }
        default: return state;
    }
}

// GET VISIBLE EXPENSES
const getVisibleExpenses = (expenses,{text,sortBy,startDate,endDate}) =>{
    return expenses.filter((expense)=>{
        // cheking for their validity
        // only those expenses will be show which have a valid startDate , valid End Date
        const startDateMatch = typeof startDate!=='number' || expense.createdAt>=startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.value <= endDate ;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        // if all the three things exists then only it will be visible
        return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a,b)=>{
        if(sortBy==='date')
        {
            return (a.createdAt < b.createdAt) ?1 : -1;
        }
        else{
            return a.amount < b.amount ?1:-1;
        }
    })
}


//store creation
// now we are able to manage both the properties i.e.
// expenses and filters seperately
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(()=>{
    const state = store.getState();
    // using this function we ensure that only valid expenses are shown
    const visibleExpenses = getVisibleExpenses(state.expenses,state.filters);
    console.log(visibleExpenses);
});

// Dsipatching
const expenseOne = store.dispatch(addExpense({description:'rent', amount:100, createdAt:1000}));
const expenseTwo = store.dispatch(addExpense({description:'coffee', amount:300, createdAt:-1000}));
// store.dispatch(removeExpense({id:expenseOne.expense.id}));
// store.dispatch(editExpense(expenseTwo.expense.id,{amount: 500}));
store.dispatch(setTextFilter('rent'));
store.dispatch(sortByAmount()); // change the sortBy property to Amount
// store.dispatch(sortByDate()); // change the sort by property to Date which is default
store.dispatch(setStartDate(125));
// store.dispatch(setEndDate(150));


const demoState = {
    expenses:[{
        id: '123',
        description: 'January Rent',
        note: 'This was final payment',
        amount: 54500,
        createdAt: 0
    }],
    filters:{
        text: 'rent',
        sortBy: 'amount',//date or amount
        startDate: undefined,
        endDate: undefined
    }
}   