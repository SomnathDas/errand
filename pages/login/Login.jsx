import "./Login.css";

/* Firebase */
import { auth, googleProvider } from "../../config/firebase/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

/* React Router DOM */
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";

const Login = () => {
  const [user, loading, error] = useAuthState(auth);
  const [isLoggingIn, setIsLoggingIn] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, loading]);

  const loginWithGoogle = async () => {
    setIsLoggingIn(1);
    try {
      await signInWithPopup(auth, googleProvider);
      setIsLoggingIn(0);
    } catch (err) {
      navigate(0);
    }
  };

  return isLoggingIn || loading ? (
    <Loading />
  ) : (
    <div className="login-container">
      <div className="login">
        <div>
          <h1 className="login-title">Login</h1>
          <h2 className="login-subtitle">
            Please Continue with your Google Account
          </h2>
        </div>

        <button onClick={loginWithGoogle} className="google-btn">
          <span className="google-icon"></span>
          Login using Google
        </button>
      </div>

      <div className="side-bg"></div>
    </div>
  );
};

export default Login;
