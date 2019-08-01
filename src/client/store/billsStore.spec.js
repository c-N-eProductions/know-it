import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import { expect } from 'chai'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import recentBills from '../testingData/recentBillsData'
import billsReducer, {
  fetchRecentBillsThunk,
  getRecentBills
} from './billsStore'

//console.log(`fetchRecentBillsThunk: ${ fetchRecentBillsThunk}`)
//console.log(`getRecentBills: ${JSON.stringify(typeof getRecentBills)}`)

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('billsStore - action, thunk, and reducer', () => {
  const initialState = { recentBills: [] }
  //const store = mockStore(initialState);
  let store = null
  let mockAxios = null
  axios.defaults.baseURL = 'http://localhost:8080'

  beforeEach(() => {
    store = mockStore(initialState)
    mockAxios = new MockAdapter(axios)
  })

  afterEach(() => {
    //mockAxios.restore()
    store.clearActions()
  })

  describe('getRecentBills action creator', () => {
    it('should create an action to add 20 recent bills', () => {
      //console.log("store - state: ", store.getState())
      const expectedAction = {
        type: 'GET_RECENT_BILLS',
        fetchedBills: recentBills
      }
      expect(getRecentBills(recentBills)).to.eql(expectedAction)
    })
  }) // end of getRecentBills action creator

  describe('fetchRecentBillsThunk', () => {
    it('eventually dispatches the GET_RECENT_BILLS action', async () => {
      //console.log(`dispatch function: ${store.dispatch}`)
      //console.log(`recentBillsThunk: ${JSON.stringify(fetchRecentBillsThunk)}`)
      /*store.dispatch(fetchRecentBillsThunk())
        .then(() => {
          const actions = store.getActions()
          console.log("store - state: ", store.getState())
        })*/
      //const actions = store.getActions()

      //console.log(`actions: ${actions}`)
      //expect(actions[0].type).to.be.equal('GET_RECENT_BILLS')
      //expect(actions[0].fetchedBills).to.have.length(20)
      const bills = {
        status: 'OK',
        copyright: 'Copyright (c) 2019 Pro Publica Inc. All Rights Reserved.',
        results: [
          {
            congress: 116,
            chamber: 'Both',
            num_results: 20,
            offset: 0,
            bills: [
              {
                bill_id: 'hr3841-116',
                bill_slug: 'hr3841',
                bill_type: 'hr',
                number: 'H.R.3841',
                bill_uri:
                  'https://api.propublica.org/congress/v1/116/bills/hr3841.json',
                title:
                  'To provide for the imposition of sanctions against 24 senior officials of the Border Service and Federal Security Service of Russia until the release of certain seized Ukrainian ships and crewmembers, and for other purposes.',
                short_title:
                  'To provide for the imposition of sanctions against 24 senior officials of the Border Service and Federal Security Service of Russia until the release of certain seized Ukrainian ships and crewmembers, and for other purposes.',
                sponsor_title: 'Rep.',
                sponsor_id: 'K000009',
                sponsor_name: 'Marcy Kaptur',
                sponsor_state: 'OH',
                sponsor_party: 'D',
                sponsor_uri:
                  'https://api.propublica.org/congress/v1/members/K000009.json',
                gpo_pdf_uri: null,
                congressdotgov_url:
                  'https://www.congress.gov/bill/116th-congress/house-bill/3841',
                govtrack_url:
                  'https://www.govtrack.us/congress/bills/116/hr3841',
                introduced_date: '2019-07-18',
                active: false,
                last_vote: null,
                house_passage: null,
                senate_passage: null,
                enacted: null,
                vetoed: null,
                cosponsors: 3,
                cosponsors_by_party: {
                  R: 2,
                  D: 1
                },
                committees: 'House Judiciary Committee',
                committee_codes: ['HSFA'],
                subcommittee_codes: [],
                primary_subject: '',
                summary: '',
                summary_short: '',
                latest_major_action_date: '2019-07-18',
                latest_major_action:
                  'Referred to the Committee on Foreign Affairs, and in addition to the Committee on the Judiciary, for a period to be subsequently determined by the Speaker, in each case for consideration of such provisions as fall within the jurisdiction of the committee concerned.'
              }
            ]
          }
        ]
      }

      //console.log('mockAxios: ', mockAxios.onGet)
      mockAxios.onGet('/api/bills').replyOnce(200, bills)
      await store.dispatch(fetchRecentBillsThunk())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_RECENT_BILLS')
      expect(actions[0].fetchedBills).to.have.length(1)
      expect(actions[0].fetchedBills).to.be.deep.equal(bills.results[0].bills)
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
