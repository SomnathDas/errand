import "./CircularBtn.css";

const CircularBtn = ({
  btnType,
  btnLabel,
  btnIconName,
  onClickFunc,
  parentTheme,
}) => {
  return (
    <button
      type={btnType}
      className={`circular-btn ${parentTheme}`}
      onClick={onClickFunc}
    >
      <span className={`material-icons-round circular-btn-icon ${parentTheme}`}>
        {btnIconName}
      </span>
      <p className={`circular-btn-label ${parentTheme}`}>{btnLabel}</p>
    </button>
  );
};

export default CircularBtn;
