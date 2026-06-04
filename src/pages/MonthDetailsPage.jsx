import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
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

const PageWrapper = styled.div`
  background-color: #f8fafc;
  padding: 40px;
  min-height: 100vh;
  font-family: system-ui, -apple-system, sans-serif;
`;

const TopNavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 40px;
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #0f172a;
  }
`;

const MonthSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-right: auto;
  margin-left: auto;
  transform: translateX(-60px); 
`;

const NavArrow = styled(Link)`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  text-decoration: none;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.02);
  transition: all 0.2s;

  &:hover {
    background-color: #f1f5f9;
    border-color: #cbd5e1;
  }
`;

const MonthTitle = styled.h1`
  color: #0f172a;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
`;

const WeekLabelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 16px;
  padding: 0 10px;
  text-align: center;
  color: #475569;
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 16px;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 16px;
`;

const StyledGridLink = styled(Link)`
  background-color: ${props => props.$isEmpty ? 'transparent' : '#ffffff'};
  border: 1px solid ${props => props.$isEmpty ? 'transparent' : props.$isToday ? '#5c5be5' : '#e2e8f0'};
  border-radius: 16px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 140px;
  padding: 20px;
  box-shadow: ${props => props.$isEmpty ? 'none' : '0 1px 3px 0 rgba(0, 0, 0, 0.02)'};
  pointer-events: ${props => props.$isEmpty ? 'none' : 'auto'};
  transition: all 0.2s ease-in-out;
  
  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 4px 12px -1px rgba(0, 0, 0, 0.04);
    
    span {
      color: #5c5be5;
    }
  }
`;

const DateCell = styled.div`
  font-size: 1.35rem;
  font-weight: 700;
  color: ${props => props.$isToday ? '#5c5be5' : '#0f172a'};
  text-align: left;
`;

const ViewDayLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #94a3b8;
  transition: color 0.2s;
`;

const getMonthData = (monthIndex) => {
  const year = 2026;
  const FirstDay = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const blanks = Array(FirstDay).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => (i + 1));

  return [...blanks, ...days];
};

export default function MonthDetailsPage() {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const { monthId } = useParams();
  
  const currentMonthNum = parseInt(monthId, 10);
  const PrevMonth = currentMonthNum === 1 ? 12 : currentMonthNum - 1;
  const NexMonth = currentMonthNum === 12 ? 1 : currentMonthNum + 1;

  const now = new Date();
  const currentMonthIndex = now.getMonth();
  const currentDay = now.getDate();
  const currentYear = now.getFullYear();
  const monthIdx = currentMonthNum - 1;
  const calendarDays = getMonthData(monthIdx);
  const currentMonthName = months[monthIdx];

  return (
    <PageWrapper>
      <TopNavBar>
        <BackLink to="/">
          <ArrowLeft size={16} /> Back to Dashboard
        </BackLink>
        
        <MonthSelector>
          <NavArrow to={`/month/${PrevMonth}`}>
            <ChevronLeft size={18} />
          </NavArrow>
          <MonthTitle>{currentMonthName} {currentYear}</MonthTitle>
          <NavArrow to={`/month/${NexMonth}`}>
            <ChevronRight size={18} />
          </NavArrow>
        </MonthSelector>
      </TopNavBar>

      <div>
        <WeekLabelsGrid>
          {dayLabels.map((day, i) => (
            <div key={i}>{day}</div>
          ))}
        </WeekLabelsGrid>

        <CalendarGrid>
          {calendarDays.map((day, index) => {
            const isToday =
              day !== null &&
              monthIdx === currentMonthIndex &&
              day === currentDay &&
              currentYear === 2026;

            return (
              <StyledGridLink
                key={index}
                $isEmpty={!day}
                $isToday={isToday}
                to={day ? `/day/${monthId}/${day}` : "#"}
              >
                {!day ? (
                  <div />
                ) : (
                  <>
                    <DateCell $isToday={isToday}>{day}</DateCell>
                    <ViewDayLabel>
                      View day <ArrowRight size={12} />
                    </ViewDayLabel>
                  </>
                )}
              </StyledGridLink>
            );
          })}
        </CalendarGrid>
      </div>
    </PageWrapper>
  );
}