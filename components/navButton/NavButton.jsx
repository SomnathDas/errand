import "./NavButton.css";

const NavButton = ({ label, iconName, onClickHandler, parentTheme }) => {
  return (
    <button className={`button ${parentTheme}`} onClick={onClickHandler}>
      <span className={`material-icons-round button-icon ${parentTheme}`}>
        {iconName}
      </span>
      <p className={`button-label ${parentTheme}`}>{label}</p>
    </button>
  );
};

export default NavButton;
