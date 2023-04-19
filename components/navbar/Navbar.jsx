import { signOut } from "firebase/auth";
import NavButton from "../navButton/NavButton";
import "./Navbar.css";

/* Firebase */
import { auth } from "../../config/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../../config/firebase/firebase";
import { doc, addDoc, collection, setDoc } from "firebase/firestore";

const Navbar = ({
  parentIsLoggingOut,
  parentSetIsLoggingOut,
  parentTheme,
  parentChangeTheme,
}) => {
  const [user, loading, error] = useAuthState(auth);
  const logout = async () => {
    parentSetIsLoggingOut(1);
    try {
      await signOut(auth);
      parentSetIsLoggingOut(0);
    } catch (err) {
      console.log(err);
    }
  };

  const changeTheme = async () => {
    switch (parentTheme) {
      case "light":
        parentChangeTheme("dark");
        break;
      case "dark":
        parentChangeTheme("light");
        break;
      default:
        parentChangeTheme("dark");
        break;
    }

    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      theme: parentTheme === "dark" ? "light" : "dark",
    });
  };
  return (
    <nav className={`navbar-container ${parentTheme}`}>
      <ul className="navbar-list">
        <li className="navbar-items">
          <NavButton
            label={`${parentTheme === "light" ? "dark" : "light"}`}
            iconName={`${parentTheme === "light" ? "dark_mode" : "light_mode"}`}
            onClickHandler={changeTheme}
            parentTheme={parentTheme}
          />
        </li>
        <li className="navbar-items">
          <img
            src={`${user.photoURL}`}
            alt="Your Profile Picture"
            className="nav-user-profile-pic"
          ></img>
        </li>
        <li className="navbar-items">
          <NavButton
            label={"logout"}
            iconName={"logout"}
            onClickHandler={logout}
            parentTheme={parentTheme}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
