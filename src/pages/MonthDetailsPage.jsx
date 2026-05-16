import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import styled from 'styled-components';
import { preinit } from 'react-dom';

const dayLabels = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const ViewDay = styled.div`
 text-align: left;
 color: ${props => props.isEmpty ? 'transparent' : props.isToday ? 'black' : '#444'};
 `
const StyledGridLink = styled(Link)`
  color: ${props => props.isEmpty ? 'transparent' : props.isToday ? 'white' : '#444'};
  background-color: ${props => props.isToday ? '#03a9f4' : 'transparent'};
  border-radius: ${props => props.isToday ? '20%' : '0'};
  &:hover{
  background-color: ${props => props.isEmpty ? 'transparent' : '#ccc'};
  border-radius: 8px;
  color: ${props => props.isEmpty ? 'transparent' : '#03a9f4'};
  border-color: ${props => props.isEmpty ? 'transparent' : '#03a9f4'}
}
`
const DateCell = styled.div`
  font-weight:bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
  padding:20px;
  text-align: left;
  }
  `
const getMonthData = (monthIndex) => {
  const year = 2026;
  const FirstDay = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const blanks = Array(FirstDay).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => (i + 1));

  return [...blanks, ...days];
}
export default function MonthDetailsPage() {

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const { monthId } = useParams(); // Gets the ID from the URL (e.g., '4')
  // --- Dynamic Month Navigation Logic ---
  const currentMonthNum = parseInt(monthId, 10);
  const PrevMonth = currentMonthNum === 1 ? 12 : currentMonthNum - 1;
  const NexMonth = currentMonthNum === 12 ? 1 : currentMonthNum + 1;

  const now = new Date();
  const currentMonthIndex = now.getMonth();
  const currentDay = now.getDate();
  const currentYear = now.getFullYear();
  const monthIdx = parseInt(monthId) - 1;
  const calendarDays = getMonthData(monthIdx);
  const currentMonthName = months[monthIdx];


  return (
    <div style={{ padding: '40px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 2fr)',
      }}>
        <Link to="/"> <ArrowLeft /> Back to Dashboard</Link>
        <Link to={`/month/${PrevMonth}`} ><ArrowLeft /></Link>   {currentMonthName} <Link to={`/month/${NexMonth}`}> <ArrowRight /> </Link>
      </div>
      <div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '10px',
          padding: '20px',
          textAlign: 'center'
        }}>
          {dayLabels.map((day, i) => (
            <p key={i}>{day}</p>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '10px',
          marginTop: '20px'
        }}>
          {calendarDays.map((day, index) => {
            const isToday =
              day !== null &&
              monthIdx === currentMonthIndex &&
              day === currentDay &&
              currentYear === 2026;
            return (
              <StyledGridLink
                key={index}
                isEmpty={!day}
                isToday={isToday}
                to={day ? `/day/${monthId}/${day}` : "#"}
                style={{
                  padding: '20px',
                  textAlign: 'center',
                  border: `1px solid ${!day ? 'transparent' : '#ccc'}`,
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: 'black',
                  pointerEvents: day ? 'auto' : 'none'
                }}
              >
                <DateCell>
                  {day}
                </DateCell>
                <ViewDay isEmpty={!day} > View day <ArrowRight /> </ViewDay>
              </StyledGridLink>
            )
          })}
        </div>
      </div>
    </div>
  );
}