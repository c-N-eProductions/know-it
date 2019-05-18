import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import fetchMock from 'fetch-mock'
import { expect } from 'chai'
import body from '../testingData/recentBillsData'
import billsReducer, {
  fetchRecentBillsThunk,
  getRecentBills
} from './billsStore'
import axios from 'axios'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('billsStore - action, thunk, and reducer', () => {
  let store
  const initialState = []
  const recentBills = body.results[0].bills
  axios.defaults.baseURL = 'http://localhost:8080'

  beforeEach(() => {
    store = mockStore(initialState)
  })

  afterEach(() => {
    fetchMock.restore()
    store.clearActions()
  })

  describe('getRecentBills action creator', () => {
    it('should create an action to add 20 recent bills', () => {
      const expectedAction = {
        type: 'GET_RECENT_BILLS',
        fetchedBills: recentBills
      }
      expect(getRecentBills(recentBills)).to.eql(expectedAction)
    })
  }) // end of getRecentBills action creator

  describe('fetchRecentBillsThunk', () => {
    it('eventually dispatches the GET_RECENT_BILLS action', async () => {
      fetchMock.getOnce('/api/bills', {
        body,
        headers: { 'content-type': 'application/json' }
      })
      await store.dispatch(fetchRecentBillsThunk())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_RECENT_BILLS')
      expect(actions[0].fetchedBills.results[0].bills).to.have.length(20)
    })
  }) // end of fetchRecentBillsThunk

  describe('reducer sets recent bills on state', () => {
    it('should return initial state', () => {
      expect(billsReducer(undefined, {})).to.eql([])
    })
    it('should handle GET_RECENT_BILLS', () => {
      expect(
        billsReducer(
          {},
          {
            type: 'GET_RECENT_BILLS',
            fetchedBills: recentBills
          }
        )
      ).to.eql(recentBills)
    })
  }) // end of reducer sets recent bills on state
})
