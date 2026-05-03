import { useParams, Link } from 'react-router-dom';

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
      <h1>Month {monthId}</h1>
      <Link to="/">Back to Dashboard</Link>
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
  );
}