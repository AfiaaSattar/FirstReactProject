import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const now = new Date();
const currentMonthIndex = now.getMonth();
const currentDay = now.getDate();
const currentYear = now.getFullYear();

const PageWrapper = styled.div`
  background-color: #f8fafc; 
  padding: 40px;
  min-height: 100vh;
`;

const MainHeader = styled.h1`
  color: #0f172a;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4px;
`;

const SubHeader = styled.p`
  color: #64748b;
  font-size: 1rem;
  margin-bottom: 30px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 20px;
`;

const StyledLink = styled(Link)`
  background-color: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 16px; 
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05); 
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px); 
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
    border-color: #e2e8f0;
  }
`;

const MonthHeader = styled.div`
  background-color: ${props => props.$isCurrentMonth ? '#5c5be5' : '#ffffff'};
  color: ${props => props.$isCurrentMonth ? '#ffffff' : '#0f172a'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  font-weight: 600;
  font-size: 1.1rem;
  border-bottom: ${props => props.$isCurrentMonth ? 'none' : '1px solid #f1f5f9'};
`;

const CalendarBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #ffffff;
`;

const DaysOfWeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  color: #64748b; 
  font-size: 0.85rem;
  font-weight: 500;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  gap: 8px 4px;
`;

const DateCell = styled.div`
  font-size: 0.9rem;
  font-weight: 400;
  padding: 6px 0;
  color: ${props => props.isEmpty ? 'transparent' : props.isToday ? '#ffffff' : '#334155'};
  background-color: ${props => props.isToday ? '#5c5be5' : 'transparent'};
  border-radius: ${props => props.isToday ? '50%' : '8px'}; /* دائرة كاملة لليوم الحالي تبرز بوضوح */
  cursor: ${props => props.isEmpty ? 'default' : 'pointer'};
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${props => props.isEmpty ? 'transparent' : props.isToday ? '#5c5be5' : '#f1f5f9'};
  }
`;

export default function MonthsPage() {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  const getMonthData = (monthIndex) => {
    const year = 2026;
    const FirstDay = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    const blanks = Array(FirstDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => (i + 1));

    return [...blanks, ...days];
  };

  return (
    <PageWrapper>
      <MainHeader>2026 Overview</MainHeader>
      <SubHeader>Select a month to view details</SubHeader>

      <GridContainer>
        {months.map((month, index) => {
          const isCurrentMonth = index === currentMonthIndex && currentYear === 2026;

          return (
            <StyledLink key={month} to={`/month/${index + 1}`}>
            
              <MonthHeader $isCurrentMonth={isCurrentMonth}>
                <span>{month}</span>
                <Calendar size={18} style={{ opacity: isCurrentMonth ? 1 : 0.4 }} />
              </MonthHeader>

              <CalendarBody>
               
                <DaysOfWeekGrid>
                  {dayLabels.map((day, i) => (
                    <span key={i}>{day}</span>
                  ))}
                </DaysOfWeekGrid>

                
                <DaysGrid>
                  {getMonthData(index).map((day, i) => {
                    const isToday = index === currentMonthIndex && day === currentDay && currentYear === 2026;

                    return (
                      <DateCell key={i} isEmpty={!day} isToday={isToday}>
                        {day}
                      </DateCell>
                    );
                  })}
                </DaysGrid>
              </CalendarBody>
            </StyledLink>
          );
        })}
      </GridContainer>
    </PageWrapper>
  );
}