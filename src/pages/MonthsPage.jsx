

import {Link} from 'react-router-dom'
import styled from 'styled-components';

export default function MonthsPage(){
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  const DateCell = styled.div`
  color: ${props => props.isEmpty ? 'transparent' : '#444'};
  `

  const getMonthData = (monthIndex) => {
    const year = 2026;
    const FirstDay = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    const blanks = Array(FirstDay).fill(null);
    const days = Array.from({length: daysInMonth}, (_,i) => (i + 1));

    return [...blanks, ...days];
  }
   return (
    <div style={{ padding: '40px' }}>
      <h1 className='hed'>2026 Overview</h1>
      <p className='hed2'>Select a month to view details</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '20px', 
        marginTop: '20px' 
      }}>
        {months.map((month, index) => (
          <Link 
            key={month} 
            to={`/month/${index + 1}`} 
            style={{  
              border: '1px solid #ccc', 
              textAlign: 'center', 
              textDecoration: 'none',
              color: 'black',
              borderRadius: '8px'
            }}
          >
            <div>
              <div style={{
                backgroundColor: '#ccc',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)'
              }}>
                <p> {month} </p>
                <p> Icone </p>
              </div>


              <div style={{
                backgroundColor: 'white'
              }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                backgroundColor: 'white',
              }}>
                {dayLabels.map((day,i) => (
                  <p key={i}>{day}</p>
                ))}
              </div>
              </div>
              
             <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                backgroundColor: 'white',
                gap: '7px'
              }}>

                {getMonthData(index).map((day,i) => (
                  <DateCell key={i} isEmpty={!day}>
                    {day}
                  </DateCell>
                ))}
              </div>
            </div>
           
          </Link>
        ))}
      </div>
    </div>
  );
}