
import { Link } from 'react-router-dom';

export default function MonthsPage() {
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];


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
                gridTemplateColumns: 'repeat(7, 1fr)'
              }}>
                {dayLabels.map((day,i) => (
                  <p key={i}>{day}</p>
                ))}
              </div>
              </div>



              <div style={{
                backgroundColor: 'white'
              }}>
                
              </div>
            </div>
           
          </Link>
        ))}
      </div>
    </div>
  );
}