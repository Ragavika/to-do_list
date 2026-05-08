function TaskCard({ task, deleteTask, moveTask }) {
  // Logic to determine which move buttons to show
  const showMoveRight = task.status !== "Done";
  const showMoveLeft = task.status !== "To Do";

  const nextStatus = task.status === "To Do" ? "In Progress" : "Done";
  const prevStatus = task.status === "Done" ? "In Progress" : "To Do";

  return (
    <div className="task-card">
      <div className="task-header">
        <span className={`priority-badge ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
        <button className="delete-btn" onClick={() => deleteTask(task.id)}>×</button>
      </div>
      
      <p className="task-text">{task.text}</p>

      <div className="task-footer">
        {showMoveLeft && (
          <button onClick={() => moveTask(task.id, prevStatus)}>←</button>
        )}
        {showMoveRight && (
          <button onClick={() => moveTask(task.id, nextStatus)}>→</button>
        )}
      </div>
    </div>
  );
}

export default TaskCard;