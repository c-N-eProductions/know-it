import axios from 'axios'
// initial state
const recentBills = []

// action types
const GET_RECENT_BILLS = 'GET_RECENT_BILLS'

// action creators
export const getRecentBills = fetchedBills => ({
  type: GET_RECENT_BILLS,
  fetchedBills
})

// thunk creators
export const fetchRecentBillsThunk = () => dispatch => {
  return axios
    .get(`/api/bills`)
    .then(res => {
      // destructuring res.data.results[0].bills into a variable call bills
      const { data: { results: [{ bills }] } } = res
      dispatch(getRecentBills(bills))
    })
    .catch(err => console.error('this is the error', err))
}

// reducers
const billsReducer = (state = recentBills, action) => {
  switch (action.type) {
    case GET_RECENT_BILLS:
      return action.fetchedBills
    default:
      return state
  }
}

export default billsReducer
