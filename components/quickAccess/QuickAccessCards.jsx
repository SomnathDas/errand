import "./QuickAccessCards.css";

const QuickAccessCards = ({
  id,
  iconName,
  cardColor,
  taskAmt,
  taskCategory,
  gridArea,
  parentFilter,
  onClickHandler,
}) => {
  return (
    <div
      className={`card-container ${parentFilter === id ? "active" : ""}`}
      style={{
        backgroundColor: `${cardColor}`,
        border: `solid 2px ${cardColor}`,
        gridArea: gridArea,
      }}
      onClick={onClickHandler}
    >
      <div className="card-head">
        <span className="material-icons-round card-icon">{iconName}</span>
        <span className="material-icons-round card-option-icon">
          more_horiz
        </span>
      </div>
      <div className="card-content">
        <h1>{taskAmt}</h1>
        <h2>{taskCategory}</h2>
      </div>
    </div>
  );
};

export default QuickAccessCards;
