import "./Loading.css";

const Loading = () => {
  return (
    <div className={`loading`}>
      <svg
        className="cube"
        version="1.1"
        viewBox="0 0 490.45 490.45"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m245.23 0-201.39 126.81v236.82l201.39 126.81 201.39-126.81v-236.82l-201.39-126.81zm158.24 135.1-158.24 99.643-158.24-99.643 158.24-99.643 158.24 99.643zm-329.63 27.172 156.39 98.477v184.81l-156.39-98.478v-184.81zm186.39 283.29v-184.81l156.39-98.478v184.81l-156.39 98.478z" />
      </svg>
    </div>
  );
};

export default Loading;
