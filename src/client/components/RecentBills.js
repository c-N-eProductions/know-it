import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchRecentBillsThunk } from '../store/billsStore'
import BillsCard from './BillsCard'
/**
 * COMPONENT
 */
export class RecentBills extends Component {
  componentDidMount() {
    this.props.getRecentBills()
  }
  addDefaultSrc = ev => {
    ev.target.src = 'images/knowIt-logo.svg'
  }

  render() {
    const { recentBills } = this.props

    return (
      <div className="recent-bills">
        <h1>20 Most Recent Congressional Bills</h1>
        {recentBills &&
          recentBills.map(bill => {
            const sponsorId = bill.sponsor_id
            const sponsorIdAlt = sponsorId.toLowerCase()

            return (
              <BillsCard
                key={bill.number}
                bill={bill}
                sponsorId={sponsorId}
                sponsorIdAlt={sponsorIdAlt}
                addDefaultSrc={this.addDefaultSrc}
              />
            )
          })}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => ({
  recentBills: state.recentBills
})

const mapDispatchToProps = dispatch => ({
  getRecentBills() {
    dispatch(fetchRecentBillsThunk())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentBills)
