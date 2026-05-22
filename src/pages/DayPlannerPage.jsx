import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import styled from 'styled-components';
const NavBut = styled(Link)`
text-decoration: none;
`
const HeadNav = styled.div`
display: grid;
grid-template-columns: 1fr auto 1fr;
width: 100%;
align-items: center;
`
const DateSelector = styled.div`
display: grid;
grid-template-columns: auto auto auto;
justify-content: center;
align-items: center;
gap: 80px;
`
const Yearis = styled.p`
margin: 4px 0 0 0;
align-items: center;
`
const CenterDate = styled.div`
text-align: center;
`
// DailyNotes class's
const DailyNotes = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border: 1px solid #e2e8f0; 
  border-radius: 12px; 
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  padding: 0px;
  margin-bottom: 24px;
  margin-top: 50px;
  `
const DailyHeader = styled.div`
  background-color: #f8fafc;
  padding: 16px 24px;
  font-weight: 600;
  color: #1e293b;
  border-bottom: 1px solid #e2e8f0; 
`
const DailyInfo = styled.textarea`
  margin: 24px;
  padding: 16px;
  height: 150px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  outline: none;

  &:focus{
  border: 2px solid #5587c6;
}
`;

const Tasks = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border: 1px solid #e2e8f0; 
  border-radius: 12px; 
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  padding: 0px;
  margin-bottom: 24px;
  margin-top: 50px;
`
const TasksHead = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  background-color: #f2f5f8;
  padding: 16px 24px;
  font-weight: 600;
  color: #1e293b;
  border-bottom: 1px solid #e2e8f0; 
`
const AddTasks = styled.div`
  display: grid;
  grid-template-columns: 2fr auto;
  background-color: #fbfbfb;
  padding: 16px 24px;
  font-weight: 600;
  color: #1e293b;
  border-bottom: 1px solid #e2e8f0; 
  gap:20px;
  align-items: center;

  input{
    margin: 5px;
    padding: 16px;
    height: 30px;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    outline: none;

    &:focus{
    border: 2px solid #5587c6;
}
  }

  button{
    display: inline-block;
    padding: 21px 30px;
    border: 2px solid #5587c6;
    background-color: #5587c6;
    color: white;
    border-radius: 12px;
  }
`

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;
  accent-color: #059669;
  cursor: pointer;
`

const TasksList = styled.div`
  display: flex;
  justify-content: space-between; /* Left items left, right badge right */
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #e2e8f0; /* Crisp line between list items */
`
const StatusBadge = styled.div`
display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 20px;
  background-color: ${props => props.$isOverdue ? '#fef2f2' : '#f1f5f9'};
  color: ${props => props.$isOverdue ? '#dc2626' : '#64748b'};
  `

export default function DayPlannerPage() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Review quarterly reports", time: "Overdue", completed: false, isOverdue: true },
    { id: 2, text: "Team standup meeting", time: "10:00", completed: true, isOverdue: false },
    { id: 3, text: "Update project documentation", time: "Overdue", completed: false, isOverdue: true }
  ]);
  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div style={{ padding: '40px', margin: '0 100px 0 200px' }}>
      {/* Header Nav */}
      <HeadNav>
        <NavBut to="/"> ←  Back to Dashboard</NavBut>
        <DateSelector>
          <span> {'<'} </span>
          <CenterDate>
            <span>Friday, May 1 </span>
            <Yearis>2026</Yearis>
          </CenterDate>
          <span> {'>'} </span>
        </DateSelector>
      </HeadNav>

      {/*  Text Area */}
      <DailyNotes>
        <DailyHeader>
          Daily Notes
        </DailyHeader>
        <DailyInfo placeholder=' Write your thoughts, ideas, or important notes for today...'>
        </DailyInfo>
      </DailyNotes>

      {/*  Tasks */}
      <Tasks>
        <TasksHead>
          <span>Tasks</span>
          <span style={{
            textAlign: 'right',
            fontWeight: 'normal'
          }}>1 of 3 completed</span>
        </TasksHead>

        <AddTasks>
          <input value='' placeholder='Add a new task...' />
          <button> + Add </button>
        </AddTasks>

        {/* Pinned to Left */}
        {tasks.map(task => (
          <TasksList key={task.id}>
            <leftItems>
              <Checkbox
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              {task.text}
            </leftItems>

            {/* Pinned to Right
            <StatusBadge $isOverdue={task.isOverdue && !task.completed}>
              {task.completed ? "10:00" : task.time}
            </StatusBadge>  */}

            <StatusBadge $isOverdue={task.isOverdue && !task.completed}>

            </StatusBadge>
          </TasksList>
        ))}

      </Tasks>

    </div>
  );
}

