import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import { expect } from 'chai'
import Adapter from 'enzyme-adapter-react-16'
import { RecentBills } from './RecentBills'
import recentBillsAPIResults from '../testingData/recentBillsData'
const { results: [{ bills }] } = recentBillsAPIResults

Enzyme.configure({ adapter: new Adapter() })

describe('RecentBills component', () => {
  let recentBillsWrapper
  beforeEach(() => {
    recentBillsWrapper = shallow(
      <RecentBills recentBills={bills} getRecentBills={() => {}} />
    )
  })

  it('should render a title as an h1 element', () => {
    expect(recentBillsWrapper.find('h1').text()).to.be.equal(
      '20 Most Recent Congressional Bills'
    )
  })

  it('should render twenty recent bills, each with a class of "recentBill"', () => {
    expect(recentBillsWrapper.find('.recent-bill')).to.have.lengthOf(20)
  })
}) // end of RecentBills component
