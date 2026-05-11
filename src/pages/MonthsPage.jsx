
import { Calendar } from 'lucide-react';
import {Link} from 'react-router-dom'
import styled from 'styled-components';

//activ month and day
const now = new Date();
const currentMonthIndex = now.getMonth();
const currentDay = now.getDate();
const currentYear = now.getFullYear();

export default function MonthsPage(){
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  const DateCell = styled.div`
  color: ${props => props.isEmpty ? 'transparent' : props.isToday ? 'white' : '#444'};
  background-color: ${props => props.isToday ? '#03a9f4' : 'transparent'}
  `
  const IconContainer = styled.div`
    display: flex;
    align-items: right;
    justify-content: right;
    padding: 15px;
  `
  const MonthContainer = styled.div`
    display: flex;
    align-items: left;
    justify-content: left;
    padding: 15px;
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
        marginTop: '20px',
        backgroundColor: 'white',
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
              borderRadius: '8px',
            }}
          >
            <div>
              <div style={{
               backgroundColor: index === currentMonthIndex && currentYear === 2026 ? '#e1f5fe' : '#f0f0f0',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)'
              }}>
                <MonthContainer>
                  {month}
                </MonthContainer>

                <IconContainer>
                   <Calendar />
                </IconContainer>
              </div>


              <div style={{
                backgroundColor: 'white'
              }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                backgroundColor: 'white',
                padding: '20px'
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
                gap: '7px',
              }}>
              {getMonthData(index).map((day, i) => {
                    // This logic checks if the cell is TODAY
                    const isToday = index === currentMonthIndex && day === currentDay && currentYear === 2026;

                    return (
                      <DateCell key={i} isEmpty={!day} isToday={isToday}>
                        {day}
                      </DateCell>
                    );
                  })}
              </div>
            </div>
           
          </Link>
        ))}
      </div>
    </div>
  );
}