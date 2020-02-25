import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchRecentBillsThunk } from '../store/billsStore'
// import { results } from '../testingData/RctBillsdummyDataForImageTest'

/**
 * COMPONENT
 */
export class RecentBills extends Component {
  componentDidMount() {
    this.props.getRecentBills()
  }
  addDefaultSrc(ev) {
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
              <div key={bill.number} className="recent-bill">
                <span>
                  {/*<img
                    src={primaryurl ? `https://theunitedstates.io/images/congress/225x275/${sponsorId}.jpg` : secondaryurl ? `https://www.congress.gov/img/member/${sponsorIdAlt}_200.jpg` : "../"}
                  />*/}
                  {/*<img className={`image-${sponsorId}`} src={`https://theunitedstates.io/images/congress/225x275/${sponsorId}.jpg`} />
                <img className={`image-${sponsorIdAlt}`} src={`https://www.congress.gov/img/member/${sponsorIdAlt}_200.jpg`} />*/}
                  {/*<img onError={ev => this.addDefaultSrc(ev, sponsorIdAlt)} className="img-responsive" src={`https://theunitedstates.io/images/congress/225x275/${sponsorId}.jpg`} />*/}

                  <div>
                    <object
                      data={`https://theunitedstates.io/images/congress/225x275/${sponsorId}.jpg`}
                      type="image/png"
                    >
                      <img
                        onError={ev => this.addDefaultSrc(ev, sponsorIdAlt)}
                        src={`https://www.congress.gov/img/member/${sponsorIdAlt}_200.jpg`}
                        alt="Congressperson Photo"
                      />
                    </object>
                  </div>
                </span>
                <h1>{sponsorId}</h1>
                <ul style={{ display: 'inline-block' }}>
                  <li className="bill-number">
                    <a href={bill.govtrack_url}>{bill.number}</a>
                  </li>
                  <li className="bill-title">{bill.title}</li>
                  <li className="bill-introduced-date">
                    {bill.introduced_date}
                  </li>
                  <li className="bill-sponsor">
                    {`${bill.sponsor_title} ${bill.sponsor_name}: ${
                      bill.sponsor_state
                    }-${bill.sponsor_party}`}
                  </li>
                  <li className="bill-lastest-action">
                    {`${bill.latest_major_action.slice(0, -1)} on ${
                      bill.latest_major_action_date
                    }`}
                  </li>
                </ul>
              </div>
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
