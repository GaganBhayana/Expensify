
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

export default expensesReducer;