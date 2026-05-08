import TaskCard from './TaskCard';

function Column({ title, tasks, deleteTask, moveTask }) {
  return (
    <div className="column">
      <h2>{title}</h2>
      <div className="task-list">
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            deleteTask={deleteTask} 
            moveTask={moveTask} 
          />
        ))}
      </div>
    </div>
  );
}

export default Column;