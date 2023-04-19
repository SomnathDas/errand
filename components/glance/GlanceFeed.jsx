import "./GlanceFeed.css";

const GlanceFeed = ({ taskData }) => {
  return (
    <div className="glance-feed-container">
      <div className="glance-head">
        <span className="material-icons-round is-done-icon">
          {taskData.isDone ? "check_circle" : "check_circle_outline"}
        </span>
        <h1>{taskData.at}</h1>
      </div>
      <div className="glance-body">
        <h1>{taskData.title}</h1>
        <p>{taskData.duration} mins</p>
      </div>
    </div>
  );
};

export default GlanceFeed;
