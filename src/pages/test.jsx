import {Link} from 'react-router-dom'

export default function MonthsPage(){
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  return(
    <div>
      <h1>2026 Overview</h1>
      <p>Select a month to view details</p>
      <div style={{
        border: '2px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px'
      }}>
        {months.map((month,index) => (
          <Link
          key={month}
          to={`/month/${index + 1}`}
          >
            {month}
          </Link>
        ))}
      </div>
    </div>
  )
}