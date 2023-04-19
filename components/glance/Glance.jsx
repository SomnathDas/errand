import { useEffect, useState } from "react";
import "./Glance.css";
import GlanceFeed from "./GlanceFeed";

const Glance = ({ nowDate, parentNowTasks, parentTheme }) => {
  const [nowTasks, setNowTasks] = useState([]);

  useEffect(() => {
    if (parentNowTasks) {
      let taskObj = parentNowTasks.map((obj) => ({
        completionDate: new Date(obj["toBeDoneOn"].seconds * 1000),
        title: obj["title"],
        duration: obj["duration"],
        at: new Date(obj["toBeDoneOn"].seconds * 1000).toLocaleTimeString(),
        id: obj["id"],
        isDone: obj["isDone"],
      }));

      setNowTasks(
        taskObj.filter(
          (obj) => obj["completionDate"].getDate() === nowDate.date
        )
      );
    }
  }, [parentNowTasks]);
  return (
    <div className={`glance-container ${parentTheme}`}>
      <h1 className="glance-current-date">
        <strong>
          {nowDate.date}
          {`\n`}
          {nowDate.month}
        </strong>{" "}
        {`\n`}({nowTasks.length} Events)
      </h1>
      {nowTasks.map((data) => (
        <GlanceFeed taskData={data} key={data.id} parentTheme={parentTheme} />
      )) || <p>Loading</p>}
    </div>
  );
};

export default Glance;
