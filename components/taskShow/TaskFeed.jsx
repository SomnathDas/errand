import "./TaskFeed.css";
import { useEffect, useState } from "react";

/* Firebase */
import { auth, db } from "../../config/firebase/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import CircularBtn from "../circularBtn/CircularBtn";

const TaskFeed = ({ taskData, parentTheme }) => {
  const [taskDone, setTaskDone] = useState(taskData["isDone"]);

  useEffect(() => {
    const updateIsDone = async () => {
      await updateDoc(
        doc(db, "users", auth.currentUser.uid, "tasks", taskData["id"]),
        {
          isDone: taskDone,
        }
      );
    };
    updateIsDone();
  }, [taskDone]);

  useEffect(() => {
    setTaskDone(taskData["isDone"]);
  }, [taskData]);

  const deleteTask = async () => {
    await deleteDoc(
      doc(db, "users", auth.currentUser.uid, "tasks", taskData["id"])
    );
  };
  return (
    <div className={`task-feed-container ${parentTheme}`}>
      <div className="task-head">
        <input
          type="checkbox"
          name="isDone"
          id="is-done"
          className="round"
          checked={taskDone}
          onChange={(e) => setTaskDone(e.target.checked)}
        />
        <h2 id="task-title">{taskData.title}</h2>
      </div>
      <div className="task-options">
        <CircularBtn
          btnLabel={"Delete"}
          btnIconName={"delete"}
          btnType={"button"}
          onClickFunc={deleteTask}
          parentTheme={parentTheme}
        />
      </div>
    </div>
  );
};

export default TaskFeed;
