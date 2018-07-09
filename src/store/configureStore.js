import {createStore,combineReducers} from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

export default () =>{
    //store creation
    // now we are able to manage both the properties i.e. expenses and filters seperately
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
        },)
    );
    return store;
}
