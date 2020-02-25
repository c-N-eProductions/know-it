import React from 'react'

const BillsCard = ({ bill, sponsorId, sponsorIdAlt, addDefaultSrc }) => (
  <div className="recent-bill">
    <span>
      <div>
        <object
          data={`https://theunitedstates.io/images/congress/225x275/${sponsorId}.jpg`}
          type="image/png"
        >
          <img
            onError={ev => addDefaultSrc(ev, sponsorIdAlt)}
            src={`https://www.congress.gov/img/member/${sponsorIdAlt}_200.jpg`}
            alt="Congressperson Photo"
          />
        </object>
      </div>
    </span>
    <h1>{sponsorId} Made some changes from component </h1>
    <ul style={{ display: 'inline-block' }}>
      <li className="bill-number">
        <a href={bill.govtrack_url}>{bill.number}</a>
      </li>
      <li className="bill-title">{bill.title}</li>
      <li className="bill-introduced-date">{bill.introduced_date}</li>
      <li className="bill-sponsor">
        {`${bill.sponsor_title} ${bill.sponsor_name}: ${bill.sponsor_state}-${
          bill.sponsor_party
        }`}
      </li>
      <li className="bill-lastest-action">
        {`${bill.latest_major_action.slice(0, -1)} on ${
          bill.latest_major_action_date
        }`}
      </li>
    </ul>
  </div>
)

export default BillsCard
