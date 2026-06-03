import { data, Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, Play, Pause, Trash2, Square } from 'lucide-react';
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

  &:focus {
    border: 2px solid #5587c6;
  }
`
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
  gap: 20px;
  align-items: center;

  input {
    margin: 5px;
    padding: 16px;
    height: 30px;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    outline: none;

    &:focus {
      border: 2px solid #5587c6;
    }
  }

  button {
    display: inline-block;
    padding: 21px 30px;
    border: 2px solid #5587c6;
    background-color: #5587c6;
    color: white;
    border-radius: 12px;

    &:hover {
      cursor: pointer;
      background-color: #679ad8;
    }
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
  justify-content: space-between; 
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #e2e8f0; 
`
const TimerControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`
const TimeDisplay = styled.time`
  font-family: monospace;
  font-variant-numeric: tabular-nums;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.$isActive ? '#5587c6' : '#64748b'};
`
const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 50%;
  color: #64748b;
  transition: all 0.2s;

  &:hover {
    background-color: #f1f5f9;
    color: #1e293b;
  }
`
// Custom style to make the trash icon change to red on hover
const DeleteButton = styled(IconButton)`
  &:hover {
    background-color: #fef2f2;
    color: #dc2626;
  }
`

export default function DayPlannerPage() {
  const {monthId, dayId} = useParams();

  // This code to know in which day this tap
  const jsMonthIndex = parseInt(monthId, 10) -1;
  const jsDayNumber = parseInt(dayId, 10);
  const CurrentYear = 2026;

  const dateObject = new Date(CurrentYear, jsMonthIndex, jsDayNumber);
  const CurrentDay = dateObject.toLocaleDateString('en-US', { weekday: 'long' });   const monthsMap = {
    "1": "January",
    "2": "February",
    "3": "March",
    "4": "April",
    "5": "May",
    "6": "June",
    "7": "July",
    "8": "August",
    "9": "September",
    "10": "October",
    "11": "November",
    "12": "December"
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

  // 1. Added the delete function logic here!
  const deleteTask = (id) => {
    // If the running timer task is deleted, turn off the active timer hook safely
    if (id === activeTaskId) setActiveTaskId(null);
    
    // Filter keeps everything EXCEPT the item that matches the passed ID
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  return (
    <div style={{ padding: '40px', margin: '0 100px 0 200px' }}>
      {/* Header Nav */}
      <HeadNav>
        <NavBut to={`/month/${goToThetMonth}`}> ←  Back to {CurrentMonthName}</NavBut>
        <DateSelector>
          <span> {'<'} </span>
          <CenterDate>
            <span> {CurrentDay}, {CurrentMonthName} {dayId} </span>
            <Yearis>2026</Yearis>
          </CenterDate>
          <span> {'>'} </span>
        </DateSelector>
      </HeadNav>

      {/* Text Area */}
      <DailyNotes>
        <DailyHeader>Daily Notes</DailyHeader>
        <DailyInfo placeholder=' Write your thoughts, ideas, or important notes for today...' />
      </DailyNotes>

      {/* Tasks Layout Container */}
      <Tasks>
        <TasksHead>
          <span>Tasks</span>
          <span style={{ textAlign: 'right', fontWeight: 'normal' }}>
            {completedCount} of {tasks.length} completed
          </span>
        </TasksHead>

        <AddTasks>
          <input
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder='Add a new task...' 
          />
          <button onClick={addTask}> + Add </button>
        </AddTasks>

        {/* Task Mapping Render */}
        {tasks.map(task => (
          <TasksList key={task.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Checkbox
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#94a3b8' : 'inherit' }}>
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

              {/* 2. Added Delete Button on the far right of the item actions */}
              <DeleteButton onClick={() => deleteTask(task.id)} title="Delete Task">
                <Trash2 size={16} />
              </DeleteButton>
            </TimerControls>
          </TasksList>
        ))}
      </Tasks>
    </div>
  );
}