
// Set text Filter
export const setTextFilter = (text="")=>({
    type: 'SET_TEXT_FILTER',
    text
})
// sort by amount
export const  sortByAmount = () =>({
    type: 'SORT_BY_AMOUNT'
})
// sort by date
export const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})
// Set START date
export const setStartDate = (date=undefined) =>({
    type: 'SET_START_DATE',
    date
})
// Set END date
export const setEndDate = (date=undefined) =>({
    type: 'SET_END_DATE',
    date
})