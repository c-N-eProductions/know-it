import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import { expect } from 'chai'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import billsReducer, {
  fetchRecentBillsThunk,
  getRecentBills
} from './billsStore'
import recentBillsAPIResults from '../testingData/recentBillsData'

const { results: [{ bills: twentyRecentBills }] } = recentBillsAPIResults
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('billsStore - action, thunk, and reducer', () => {
  const initialState = { recentBills: [] }
  let store = null
  let mockAxios = null
  axios.defaults.baseURL = 'http://localhost:8080'

  beforeEach(() => {
    store = mockStore(initialState)
    mockAxios = new MockAdapter(axios)
  })

  afterEach(() => {
    store.clearActions()
  })

  describe('getRecentBills action creator', () => {
    it('should create an action to add 20 recent bills', () => {
      const expectedAction = {
        type: 'GET_RECENT_BILLS',
        fetchedBills: twentyRecentBills
      }
      expect(getRecentBills(twentyRecentBills)).to.eql(expectedAction)
    })
  }) // end of getRecentBills action creator

  describe('fetchRecentBillsThunk', () => {
    it('eventually dispatches the GET_RECENT_BILLS action', async () => {
      mockAxios.onGet('/api/recentBills').replyOnce(200, recentBillsAPIResults)
      await store.dispatch(fetchRecentBillsThunk())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_RECENT_BILLS')
      expect(actions[0].fetchedBills).to.have.length(20)
      expect(actions[0].fetchedBills).to.be.deep.equal(
        recentBillsAPIResults.results[0].bills
      )
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
            fetchedBills: twentyRecentBills
          }
        )
      ).to.eql(twentyRecentBills)
    })
  }) // end of reducer sets recent bills on state
}) // end of billsStore - action, thunk, and reducer
