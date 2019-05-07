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
