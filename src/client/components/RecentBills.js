import React from 'react'
import { connect } from 'react-redux'

/**
 * COMPONENT
 */
export const RecentBills = ({ recentBills }) => (
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

/**
 * CONTAINER
 */
const mapStateToProps = state => ({
  recentBills: state.recentBills
})

export default connect(mapStateToProps)(RecentBills)
