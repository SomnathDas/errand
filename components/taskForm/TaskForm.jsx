import CircularBtn from "../circularBtn/CircularBtn";
import "./TaskForm.css";
import { useState, useEffect } from "react";

/* Firebase */
import { auth, db } from "../../config/firebase/firebase";
import {
  doc,
  addDoc,
  collection,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";

const TaskForm = ({ isOpen, setIsOpen, parentTheme }) => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState();
  const [toBeDoneOn, setToBeDoneOn] = useState(
    new Date().toISOString().substring(0, 16)
  );
  const [tag, setTag] = useState("assignment");
  const [priority, setPriority] = useState(1);

  const createTask = async () => {
    if (title.trim().length < 2 || toBeDoneOn === null || priority === null) {
      return 0;
    }

    let date = new Date(toBeDoneOn);

    await addDoc(collection(db, "users", auth.currentUser.uid, "tasks"), {
      title: title,
      duration: parseInt(duration),
      toBeDoneOn: Timestamp.fromDate(date),
      tag: tag,
      priority: priority,
      isDone: 0,
      createdAt: serverTimestamp(),
    });

    setTitle("");
    setDuration(0);
    setToBeDoneOn("2023-06-");

    setIsOpen(false);
  };

  return (
    <div className="container">
      <div>
        <CircularBtn
          btnType={"submit"}
          btnLabel={"Close"}
          btnIconName={"close"}
          onClickFunc={() => setIsOpen(!isOpen)}
          parentTheme={parentTheme}
        />
      </div>

      <form
        className="task-form-container"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="task-title">Task title</label>
        <input
          type="text"
          name="TaskTitle"
          id="task-title"
          placeholder="I want to"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={128}
          required
        />
        <label htmlFor="task-date">To be done on</label>
        <input
          type="datetime-local"
          name="task-date"
          id="task-date"
          value={toBeDoneOn}
          onChange={(e) => setToBeDoneOn(e.target.value)}
          required
        />

        <label htmlFor="task-duration">In the duration of (minutes)</label>
        <input
          type="number"
          name="TaskDuration"
          id="task-duration"
          placeholder="45 minutes"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
        <label htmlFor="tag">Tag the task as</label>
        <select
          name="tag"
          id="tag"
          onChange={(e) => setTag(e.target.value)}
          value={tag}
          required
        >
          <option value="assignment">Assignment</option>
          <option value="meeting">Meeting</option>
          <option value="grocery">Grocery</option>
        </select>
        <label htmlFor="priority">Priority of this task</label>
        <select
          name="priority"
          id="priority"
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
          required
        >
          <option value={1}>Urgent</option>
          <option value={2}>As Soon as Possible</option>
          <option value={3}>Sometime</option>
        </select>
        <CircularBtn
          btnType={"submit"}
          btnLabel={"Save Task"}
          btnIconName={"task_alt"}
          onClickFunc={() => createTask()}
          parentTheme={parentTheme}
        />
      </form>
    </div>
  );
};

export default TaskForm;
