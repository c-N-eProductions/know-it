import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import fetchMock from 'fetch-mock'
import {expect} from 'chai'
import body from '../testingData/recentBillsData'
import {fetchRecentBillsThunk} from './billsStore'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  const initialState = {bills: []}

  beforeEach(() => {
    store = mockStore(initialState)
  })

  afterEach(() => {
    fetchMock.restore()
    store.clearActions()
  })

  describe('fetchRecentBillsThunk', () => {
    it('eventually dispatches the GET_RECENT_BILLS action', async () => {
      fetchMock.getOnce('/api/bills', {
        body,
        headers: {'content-type': 'application/json'}
      })
      await store.dispatch(fetchRecentBillsThunk())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_RECENT_BILLS')
      expect(actions[0].bills).to.be.deep.equal(body)
    })
  })
})
