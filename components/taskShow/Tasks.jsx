import TaskFeed from "./TaskFeed";
import "./Tasks.css";

const Tasks = ({
  setIsOpen,
  isOpen,
  parentTasks,
  isTaskLoading,
  parentFilter,
  parentTheme,
}) => {
  return (
    <div className="tasks-container">
      <div className="task-head">
        <h1>
          {parentFilter === 1
            ? `Meetings (${parentTasks.length})`
            : parentFilter === 2
            ? `Groceries (${parentTasks.length})`
            : parentFilter === 3
            ? `Assignments (${parentTasks.length})`
            : `All Tasks (${parentTasks.length})`}
        </h1>
        <button
          className={`create-task-btn-mob ${parentTheme}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="create-task-btn-label-mob">Create</p>
        </button>
      </div>

      <div className="tasks-feed">
        {parentTasks.length !== 0 || null ? (
          parentTasks.map((doc) => (
            <TaskFeed taskData={doc} key={doc.id} parentTheme={parentTheme} />
          ))
        ) : isTaskLoading ? (
          <p>Tasks Loading</p>
        ) : (
          <p>No Tasks</p>
        )}
      </div>
    </div>
  );
};

export default Tasks;
