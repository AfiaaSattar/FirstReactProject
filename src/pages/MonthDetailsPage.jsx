import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import styled from 'styled-components';

 const dayLabels = [
  "Sunday", 
  "Monday", 
  "Tuesday", 
  "Wednesday", 
  "Thursday", 
  "Friday", 
  "Saturday"
];

  const DateCell = styled.div`
  color: ${props => props.isEmpty ? 'transparent' : props.isToday ? 'white' : '#444'};
  background-color: ${props => props.isToday ? '#03a9f4' : 'transparent'};
  border-radius: ${props => props.isToday ? '20%' : '0'};
  border-color: ${props => props.isToday ? '#03a9f4' : 'transparent'};
  &:hover{
  background-color: ${props => props.isEmpty ? 'transparent' : '#ccc'};
  border-radius: 8px;
  }
  `
    const getMonthData = (monthIndex) => {
    const year = 2026;
    const FirstDay = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    const blanks = Array(FirstDay).fill(null);
    const days = Array.from({length: daysInMonth}, (_,i) => (i + 1));

    return [...blanks, ...days];
  }
export default function MonthDetailsPage() {

const months = [
"January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December"
];

const { monthId } = useParams(); // Gets the ID from the URL (e.g., '4')

const now = new Date();
const currentMonthIndex = now.getMonth();
const currentDay = now.getDate();
const currentYear = now.getFullYear();


const monthIdx = parseInt(monthId)-1;
const calendarDays = getMonthData(monthIdx);
const currentMonthName = months[monthIdx];

  return (
    <div style={{ padding: '40px' }}>
     <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 2fr)',
     }}> 
      <Link to="/"> <ArrowLeft /> Back to Dashboard</Link>
        <ArrowLeft /> {currentMonthName} <ArrowRight />
</div>
   <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '10px',
        padding: '20px',
        textAlign: 'center'
      }}>
        {dayLabels.map((day,i) => (
          <p key={i}>{day}</p>
        ))}
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)', 
        gap: '10px', 
        marginTop: '20px' 
      }}>
        {calendarDays.map((day,index) => {
            const isToday =
            day !== null &&
             monthIdx === currentMonthIndex &&
             day === currentDay &&
             currentYear === 2026;
         return(
          <Link 
            key={day} 
            to={day ? `/day/${monthId}/${day}` : "#"}
            style={{ 
              padding: '20px', 
              border: '1px solid #ddd', 
              textAlign: 'center',
              textDecoration: 'none',
              color: 'black'
            }}
          >
          <DateCell key={index} isEmpty={!day} isToday={isToday}>
            {day}
          </DateCell>
          </Link>            

            )
      })}
        </div>
       </div>
      </div>
  );
}