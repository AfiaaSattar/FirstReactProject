import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

 const dayLabels = [
  "Sunday", 
  "Monday", 
  "Tuesday", 
  "Wednesday", 
  "Thursday", 
  "Friday", 
  "Saturday"
];

export default function MonthDetailsPage() {
  const { monthId } = useParams(); // Gets the ID from the URL (e.g., '4')

  // Logic to determine days in the month (for 2026)
  const getDaysInMonth = (month) => {
    return new Date(2026, month, 0).getDate();
  };

  const daysCount = getDaysInMonth(monthId);
  const daysArray = Array.from({ length: daysCount }, (_, i) => i + 1);

  return (
    <div style={{ padding: '40px' }}>
     <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 2fr)',
     }}> 
      <Link to="/"> <ArrowLeft /> Back to Dashboard</Link>
        <ArrowLeft /> Month {monthId} <ArrowRight />
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
        {daysArray.map((day) => (
          <Link 
            key={day} 
            to={`/day/${monthId}/${day}`}
            style={{ 
              padding: '20px', 
              border: '1px solid #ddd', 
              textAlign: 'center',
              textDecoration: 'none',
              color: 'black'
            }}
          >
            {day}
          </Link>
        ))}
        </div>
       </div>
      </div>
  );
}