import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchRecentBillsThunk } from '../store/billsStore'

/**
 * COMPONENT
 */
export class RecentBills extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log(`these are the props ${props}`)
    this.props.getRecentBills()
  }

  render() {
    const { recentBills } = this.props
    return (
      <div className="recent-bills">
        {recentBills &&
          recentBills.map(bill => (
            <div key={bill.number} className="recent-bill">
              <ul>
                <li className="bill-number">
                  <a href={bill.govtrack_url}>{bill.number}</a>
                </li>
                <li className="bill-title">{bill.title}</li>
                <li className="bill-introduced-date">{bill.introuced_date}</li>
                <li className="bill-sponsor">
                  {`${bill.sponsor_title} ${bill.sponsor_name}: ${
                    bill.sponsor_state
                  } ${bill.sponsor_party}`}
                </li>
                <li className="bill-lastest-action">
                  {`${bill.lastest_major_action} on ${
                    bill.lastest_major_action_date
                  }`}
                </li>
              </ul>
            </div>
          ))}
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
