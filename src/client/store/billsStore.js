// initial state
const recentBills = []

// action types
export const GET_RECENT_BILLS = 'GET_RECENT_BILLS'

// action creators
export const getRecentBills = recentBills => ({
  type: GET_RECENT_BILLS,
  recentBills
})

// thunk creators

// reducers
