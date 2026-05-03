import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MonthsPage from './pages/MonthsPage';
import MonthDetailsPage from './pages/MonthDetailsPage';
import DayPlannerPage from './pages/DayPlannerPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Dashboard: Shows all 12 months */}
        <Route path="/" element={<MonthsPage />} />
        
        {/* Month View: Dynamically shows days for a selected month */}
        <Route path="/month/:monthId" element={<MonthDetailsPage />} />
        
        {/* Daily Planner: Shows notes and tasks for a specific day */}
        <Route path="/day/:monthId/:dayId" element={<DayPlannerPage />} />
      </Routes>
    </Router>
  );
}

export default App;