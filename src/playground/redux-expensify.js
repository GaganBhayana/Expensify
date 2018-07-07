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
    console.log(store.getState())
});

// Dsipatching
const expenseOne = store.dispatch(addExpense({description:'rent', amount:100}));
const expenseTwo = store.dispatch(addExpense({description:'coffee', amount:300}));
store.dispatch(removeExpense({id:expenseOne.expense.id}));
store.dispatch(editExpense(expenseTwo.expense.id,{amount: 500}));
store.dispatch(setTextFilter('rent'));
store.dispatch(sortByAmount()); // change the sortBy property to Amount
store.dispatch(sortByDate()); // change the sort by property to Date which is default
store.dispatch(setStartDate(125));
store.dispatch(setEndDate(150));


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