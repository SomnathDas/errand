import "./Overlay.css";

const Overlay = ({ isOpen, children }) => {
  return (
    <>
      {isOpen ? (
        <div className="overlay-background">
          <div className="overlay-container">{children}</div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Overlay;
