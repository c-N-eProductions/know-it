import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { RecentBills } from './RecentBills'
import recentBillsData from '../testingData/recentBillsData'

Enzyme.configure({ adapter: new Adapter() })

describe('RecentBills component', () => {
  let recentBills

  beforeEach(() => {
    recentBills = shallow(<RecentBills recentBillsData={recentBillsData} />)
  })
}) // end of RecentBills component
