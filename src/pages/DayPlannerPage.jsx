import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { RotateCcw, Play, Pause, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import styled from 'styled-components';

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

const DateSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-right: auto;
  margin-left: auto;
  transform: translateX(-60px);
`;

const NavArrowBtn = styled.button`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.02);
  transition: all 0.2s;

  &:hover {
    background-color: #f1f5f9;
    border-color: #cbd5e1;
  }
`;

const CenterDate = styled.div`
  text-align: center;
`;

const DateTitle = styled.h1`
  color: #0f172a;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
`;

const YearLabel = styled.p`
  color: #64748b;
  font-size: 0.85rem;
  margin: 4px 0 0 0;
  font-weight: 500;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: 32px;
  overflow: hidden;
`;

const CardHeader = styled.div`
  background-color: #f8fafc;
  padding: 20px 24px;
  font-weight: 700;
  color: #0f172a;
  font-size: 1.1rem;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DailyInfo = styled.textarea`
  margin: 24px;
  padding: 16px;
  height: 150px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  outline: none;
  font-family: inherit;
  font-size: 0.95rem;
  color: #334155;
  resize: vertical;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    border: 2px solid #5c5be5;
  }
`;

const AddTasks = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  padding: 24px;
  gap: 16px;
  align-items: center;
  background-color: #ffffff;

  input {
    padding: 12px 16px;
    height: 46px;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    outline: none;
    font-size: 0.95rem;
    color: #334155;
    box-sizing: border-box;

    &::placeholder {
      color: #94a3b8;
    }

    &:focus {
      border: 2px solid #5c5be5;
    }
  }

  button {
    height: 46px;
    padding: 0 24px;
    border: none;
    background-color: #5c5be5;
    color: white;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #4b4ae0;
    }
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 20px;
  height: 20px;
  accent-color: #5c5be5;
  cursor: pointer;
`;

const TasksList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-top: 1px solid #f1f5f9;
  background-color: #ffffff;
`;

const TimerControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TimeDisplay = styled.time`
  font-family: monospace;
  font-variant-numeric: tabular-nums;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.$isActive ? '#5c5be5' : '#64748b'};
  background-color: ${props => props.$isActive ? '#f0f0ff' : 'transparent'};
  padding: 4px 8px;
  border-radius: 6px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  color: #64748b;
  transition: all 0.2s;

  &:hover {
    background-color: #f1f5f9;
    color: #0f172a;
  }
`;

const DeleteButton = styled(IconButton)`
  &:hover {
    background-color: #fef2f2;
    color: #dc2626;
  }
`;

export default function DayPlannerPage() {
  const { monthId, dayId } = useParams();
  const navigate = useNavigate();

  const jsMonthIndex = parseInt(monthId, 10) - 1;
  const jsDayNumber = parseInt(dayId, 10);
  const CurrentYear = 2026;

  const dateObject = new Date(CurrentYear, jsMonthIndex, jsDayNumber);

  const nextDay = () => {
    const currentJsDate = new Date(2026, parseInt(monthId, 10) - 1, parseInt(dayId, 10));
    currentJsDate.setDate(currentJsDate.getDate() + 1);
    const nextMonth = currentJsDate.getMonth() + 1;
    const nextDay = currentJsDate.getDate();
    navigate(`/day/${nextMonth}/${nextDay}`);
  };

  const prevDay = () => {
    const currentJsDate = new Date(2026, parseInt(monthId, 10) - 1, parseInt(dayId, 10));
    currentJsDate.setDate(currentJsDate.getDate() - 1);
    const prevMonth = currentJsDate.getMonth() + 1;
    const prevDay = currentJsDate.getDate();
    navigate(`/day/${prevMonth}/${prevDay}`);
  };

  const CurrentDay = dateObject.toLocaleDateString('en-US', { weekday: 'long' });
  const monthsMap = {
    "1": "January", "2": "February", "3": "March", "4": "April", "5": "May", "6": "June",
    "7": "July", "8": "August", "9": "September", "10": "October", "11": "November", "12": "December"
  };
  const CurrentMonthName = monthsMap[monthId] || "Unknown Month";
  const goToThetMonth = parseInt(monthId, 10);

  const [tasks, setTasks] = useState([
    { id: 1, text: "Review quarterly reports", completed: false, timeSpent: 0 },
    { id: 2, text: "Team standup meeting", completed: true, timeSpent: 340 },
    { id: 3, text: "Update project documentation", completed: false, timeSpent: 0 }
  ]);

  const [taskInput, setTaskInput] = useState('');
  const [activeTaskId, setActiveTaskId] = useState(null);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    let interval = null;
    if (activeTaskId !== null) {
      interval = setInterval(() => {
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === activeTaskId
              ? { ...task, timeSpent: task.timeSpent + 1 }
              : task
          )
        );
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [activeTaskId]);

  const toggleTimer = (id) => {
    if (activeTaskId === id) {
      setActiveTaskId(null);
    } else {
      setActiveTaskId(id);
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        if (id === activeTaskId) setActiveTaskId(null);
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const resetTimer = (id) => {
    if (activeTaskId === id) setActiveTaskId(null);
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, timeSpent: 0 } : task
    ));
  };

  const addTask = () => {
    if (taskInput.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: taskInput,
      completed: false,
      timeSpent: 0
    };
    setTasks([...tasks, newTask]);
    setTaskInput('');
  };

  const deleteTask = (id) => {
    if (id === activeTaskId) setActiveTaskId(null);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <PageWrapper>
      <TopNavBar>
        <BackLink to={`/month/${goToThetMonth}`}>
          <ChevronLeft size={16} /> Back to {CurrentMonthName}
        </BackLink>
        <DateSelector>
          <NavArrowBtn onClick={prevDay}>
            <ChevronLeft size={18} />
          </NavArrowBtn>
          <CenterDate>
            <DateTitle>{CurrentDay}, {CurrentMonthName} {dayId}</DateTitle>
            <YearLabel>{CurrentYear}</YearLabel>
          </CenterDate>
          <NavArrowBtn onClick={nextDay}>
            <ChevronRight size={18} />
          </NavArrowBtn>
        </DateSelector>
      </TopNavBar>

      <CardContainer>
        <CardHeader>Daily Notes</CardHeader>
        <DailyInfo placeholder="Write your thoughts, ideas, or important notes for today..." />
      </CardContainer>

      <CardContainer>
        <CardHeader>
          <span>Tasks</span>
          <span style={{ fontWeight: 'normal', fontSize: '0.9rem', color: '#64748b' }}>
            {completedCount} of {tasks.length} completed
          </span>
        </CardHeader>

        <AddTasks>
          <input
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Add a new task..."
          />
          <button onClick={addTask}>+ Add</button>
        </AddTasks>

        {tasks.map(task => (
          <TasksList key={task.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Checkbox
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <span style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#94a3b8' : '#334155',
                fontSize: '0.95rem',
                fontWeight: '500'
              }}>
                {task.text}
              </span>
            </div>

            <TimerControls>
              <TimeDisplay $isActive={activeTaskId === task.id}>
                {formatTime(task.timeSpent)}
              </TimeDisplay>

              {!task.completed && (
                <>
                  <IconButton onClick={() => toggleTimer(task.id)}>
                    {activeTaskId === task.id ? <Pause size={16} /> : <Play size={16} />}
                  </IconButton>

                  {task.timeSpent > 0 && (
                    <IconButton onClick={() => resetTimer(task.id)}>
                      <RotateCcw size={14} />
                    </IconButton>
                  )}
                </>
              )}

              <DeleteButton onClick={() => deleteTask(task.id)} title="Delete Task">
                <Trash2 size={16} />
              </DeleteButton>
            </TimerControls>
          </TasksList>
        ))}
      </CardContainer>
    </PageWrapper>
  );
}