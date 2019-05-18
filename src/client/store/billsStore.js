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
export const fetchRecentBillsThunk = () =>  dispatch => {
  return axios
   .get(`/api/bills`)
   .then(res => {
     const {data} = res
     console.log('there some data', data)
     dispatch(getRecentBills(data))
    })
   .catch(err => console.error('this is the error', err))
  //console.log('this is the response', resp)
    console.log('newwwwwwwwwwww')
  return 'yayaaaaaaaa'
}


// reducers
const billsReducer = (state = recentBills, action) => {
  switch (action.type) {
    case GET_RECENT_BILLS:
      //console.log('fetched bills', action.fetchedBills)
      return action.fetchedBills

    default:
      return state
  }
}

export default billsReducer
