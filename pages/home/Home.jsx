import "./Home.css";

import { useState, useEffect } from "react";

import Calendar from "../../components/calender/Calendar";
import Overlay from "../../components/overlay/Overlay";
import TaskForm from "../../components/taskForm/TaskForm";
import Navbar from "../../components/navbar/Navbar";
import Glance from "../../components/glance/Glance";
import Tasks from "../../components/taskShow/Tasks";
import QuickAccess from "../../components/quickAccess/QuickAccess";
import Loading from "../../components/loading/Loading";

/* Firebase */
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../config/firebase/firebase";
import { collection, orderBy, query, limit, where } from "firebase/firestore";

/* React Router DOM */
import { useNavigate } from "react-router-dom";

const Home = () => {
  // Auth States
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(0);

  // Home States
  const [filter, setFilter] = useState(0);

  // Task States

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, loading]);

  /* Firebase Database */
  const tasksRef = collection(db, "tasks");
  const usersRef = collection(db, "users");

  const q = query(tasksRef, orderBy("priority", "desc"));
  const qUsers = query(usersRef);

  const [users, isUsersLoading, isUsersError, snapshotUsers] =
    useCollectionData(qUsers);

  const [tasks, isTaskLoading, isTaskError, snapshot] = useCollectionData(q);

  const [filteredTasks, setFilteredTasks] = useState();

  useEffect(() => {
    if (tasks) {
    }
  }, [tasks]);

  useEffect(() => {
    const allTasks = snapshot?.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (filter === 1) {
      setFilteredTasks(allTasks.filter((obj) => obj["tag"] === "meeting"));
    } else if (filter === 2) {
      setFilteredTasks(allTasks.filter((obj) => obj["tag"] === "grocery"));
    } else if (filter === 3) {
      setFilteredTasks(allTasks.filter((obj) => obj["tag"] === "assignment"));
    } else {
      setFilteredTasks(
        snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    }
  }, [filter, snapshot]);

  const [nowDate, setNowDate] = useState({ date: "", month: "" });
  const [isCreateTask, setIsCreateTask] = useState(0);

  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setTheme(
      users?.filter((user) => user.id === auth.currentUser.uid)[0]["theme"]
    );
  }, [users]);
  return user ? (
    <div className="App">
      <Overlay isOpen={isCreateTask}>
        <TaskForm
          setIsOpen={(val) => setIsCreateTask(val)}
          isOpen={isCreateTask}
          parentTheme={theme}
        />
      </Overlay>
      <div className={`navbar ${theme}`}>
        <Navbar
          parentIsLoggingOut={isLoggingOut}
          parentSetIsLoggingOut={(value) => setIsLoggingOut(value)}
          parentTheme={theme}
          parentChangeTheme={(theme) => setTheme(theme)}
        />
      </div>
      <div className={`timeline ${theme}`}>
        <QuickAccess
          parentFilter={filter}
          parentSetFilter={(val) => setFilter(val)}
        />
        <Tasks
          setIsOpen={(val) => setIsCreateTask(val)}
          isOpen={isCreateTask}
          parentTasks={filteredTasks || []}
          parentFilter={filter}
          isTaskLoading={isTaskLoading}
          parentTheme={theme}
        />
      </div>
      <div className={`sideline ${theme}`}>
        <Calendar
          setParentTaskForm={(isOpen) => setIsCreateTask(isOpen)}
          parentTaskFormOpen={isCreateTask}
          setParentNowDate={(date) => setNowDate(date)}
          parentTasks={snapshot?.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))}
          parentTheme={theme}
        ></Calendar>
        <Glance
          parentTheme={theme}
          nowDate={nowDate}
          parentNowTasks={snapshot?.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))}
        />
      </div>
    </div>
  ) : loading || isLoggingOut ? (
    <Loading />
  ) : (
    ""
  );
};

export default Home;
