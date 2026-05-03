import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function DayPlannerPage() {
  const { monthId, dayId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // This hook runs every time the component renders
  useEffect(() => {
    const timer = setInterval(() => {
      setTasks((prevTasks) => 
        prevTasks.map((task) => 
          task.timer > 0 ? { ...task, timer: task.timer - 1 } : task
        )
      );
    }, 1000); // Runs every 1000ms (1 second)

    // Cleanup: This stops the timer if you leave the page
    return () => clearInterval(timer);
  }, []);

  const addTask = () => {
    if (inputValue.trim() !== "") {
      // Adding a task with a default 60-second timer
      setTasks([...tasks, { id: Date.now(), text: inputValue, timer: 60 }]);
      setInputValue("");
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>Planner for {monthId}/{dayId}</h1>
      
      <input 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Task name"
      />
      <button onClick={addTask}>Add Task (60s)</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text} - <strong>{task.timer}s remaining</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

