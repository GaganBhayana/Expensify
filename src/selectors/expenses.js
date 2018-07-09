import moment from 'moment';
// GET VISIBLE EXPENSES
const getVisibleExpenses = (expenses,{text,sortBy,startDate,endDate}) =>{
    return expenses.filter((expense)=>{
        // cheking for their validity
        // only those expenses will be show which have a valid startDate , valid End Date
        const createdAtMoment  = moment(expense.createdAt);
        const startDateMatch = startDate?startDate.isSameOrBefore(createdAtMoment,'day') :true;
        const endDateMatch = endDate? endDate.isSameOrAfter(createdAtMoment,'day'):true;
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

export default getVisibleExpenses;