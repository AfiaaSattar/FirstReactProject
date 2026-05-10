
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// 1. Styled Components for a professional look
const PageContainer = styled.div`
  padding: 40px;
  background-color: #f8f9fa;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 30px;
`;

const MonthCard = styled(Link)`
  background: white;
  border-radius: 15px;
  text-decoration: none;
  color: #333;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  overflow: hidden;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  font-weight: bold;
  font-size: 1.2rem;
  background-color: #fdfdfd;
`;

const DaysWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 15px;
  text-align: center;
  font-size: 0.9rem;
`;

const DayLabel = styled.span`
  color: #888;
  margin-bottom: 10px;
  font-weight: 500;
`;

const DateCell = styled.div`
  padding: 8px 0;
  color: ${props => props.isEmpty ? 'transparent' : '#444'};
`;

export default function MonthsPage() {
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  // Function to get days in month and starting day for 2026
  const getMonthData = (monthIndex) => {
    const year = 2026;
    const firstDay = new Date(year, monthIndex, 1).getDay(); // 0 (Sun) to 6 (Sat)
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    
    // Create empty slots for the grid start
    const blanks = Array(firstDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    return [...blanks, ...days];
  };

  return (
    <PageContainer>
      <h1>2026 Overview</h1>
      <p>Select a month to view details</p>
      
      <CalendarGrid>
        {months.map((month, index) => (
          <MonthCard key={month} to={`/month/${index + 1}`}>
            <CardHeader>
              {month}
              <span style={{ color: '#ccc' }}>&gt;</span>
            </CardHeader>

            <DaysWrapper>
              {/* Day Name Headers (S M T W T F S) */}
              {dayLabels.map((label, i) => (
                <DayLabel key={i}>{label}</DayLabel>
              ))}

              {/* Actual Calendar Days */}
              {getMonthData(index).map((day, i) => (
                <DateCell key={i} isEmpty={!day}>
                  {day}
                </DateCell>
              ))}
            </DaysWrapper>
          </MonthCard>
        ))}
      </CalendarGrid>
    </PageContainer>
  );
}

