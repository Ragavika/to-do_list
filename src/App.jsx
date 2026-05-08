import { useState, useEffect } from 'react'; // Combined imports
import './App.css';
import Column from './components/Column';

function App() {
  const statuses = ["To Do", "In Progress", "Done"];
  
  // 1. Initialize state from LocalStorage so data persists on refresh
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("kanban-tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("Low");

  // 2. Use useEffect to save tasks to LocalStorage every time the 'tasks' array changes
  useEffect(() => {
    localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
  }, [tasks]); 

  const addTask = () => {
    if (!taskText.trim()) return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      status: "To Do",
      priority: priority
    };

    setTasks([...tasks, newTask]);
    setTaskText("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const moveTask = (id, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <div className="app-container">
      <h1>Kanban Board</h1>

      <div className="input-section">
        <input 
          type="text" 
          value={taskText} 
          onChange={(e) => setTaskText(e.target.value)} 
          placeholder="What needs to be done?"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="board">
        {statuses.map((status) => (
          <Column 
            key={status} 
            title={status} 
            tasks={tasks.filter(t => t.status === status)} 
            deleteTask={deleteTask} 
            moveTask={moveTask}
          />
        ))}
      </div>
    </div>
  );
}

export default App;