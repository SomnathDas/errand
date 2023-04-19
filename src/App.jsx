import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import "./App.css";

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default App;
