import "./QuickAccess.css";
import QuickAccessCards from "./QuickAccessCards";

/* Firebase */
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../../config/firebase/firebase";
import { collection, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const QuickAccess = ({ parentFilter, parentSetFilter }) => {
  const [user, isUserLoading, isUserError] = useAuthState(auth);

  const [meetingAmt, setMeetingAmt] = useState(0);
  const [groceryAmt, setGroceryAmt] = useState(0);
  const [assignmentAmt, setAssignmentAmt] = useState(0);

  const [qForMeeting, setQForMeeting] = useState();
  const [qForGrocery, setQForGrocery] = useState();
  const [qForAssignment, setQForAssignment] = useState();

  /* Firebase Database */
  useEffect(() => {
    const tasksRef = collection(db, "users", user.uid, "tasks");

    const qForMeeting = query(tasksRef, where("tag", "==", "meeting"));
    const qForGrocery = query(tasksRef, where("tag", "==", "grocery"));
    const qForAssignment = query(tasksRef, where("tag", "==", "assignment"));

    setQForMeeting(qForMeeting);
    setQForGrocery(qForGrocery);
    setQForAssignment(qForAssignment);
  }, [user]);

  const [tasksM, isTaskLoadingM, isTaskErrorM, snapshotM] =
    useCollectionData(qForMeeting);

  const [tasksG, isTaskLoadingG, isTaskErrorG, snapshotG] =
    useCollectionData(qForGrocery);

  const [tasksA, isTaskLoadingA, isTaskErrorA, snapshotA] =
    useCollectionData(qForAssignment);

  useEffect(() => {
    setMeetingAmt(
      snapshotM?.docs.map((doc) => ({ id: doc.id, ...doc.data() })).length
    );
    setGroceryAmt(
      snapshotG?.docs.map((doc) => ({ id: doc.id, ...doc.data() })).length
    );
    setAssignmentAmt(
      snapshotA?.docs.map((doc) => ({ id: doc.id, ...doc.data() })).length
    );
  }, [snapshotM, snapshotG, snapshotA]);

  return (
    <div className="quick-access-container">
      <div className="quick-access-head">
        <h1>Quick Access</h1>
      </div>
      <div className="quick-access-cards">
        <QuickAccessCards
          id={1}
          cardColor={"#FF6700"}
          iconName="video_call"
          taskAmt={isTaskLoadingM ? "owo" : meetingAmt}
          taskCategory={"Meetings"}
          gridArea={"A"}
          parentFilter={parentFilter}
          onClickHandler={() => parentSetFilter(parentFilter === 1 ? 0 : 1)}
        />
        <QuickAccessCards
          id={2}
          cardColor={"#FF1654"}
          iconName="local_grocery_store"
          taskAmt={isTaskLoadingG ? "owo" : groceryAmt}
          taskCategory={"Grocery"}
          gridArea={"B"}
          parentFilter={parentFilter}
          onClickHandler={() => parentSetFilter(parentFilter === 2 ? 0 : 2)}
        />
        <QuickAccessCards
          id={3}
          cardColor={"#232528"}
          iconName="task"
          taskAmt={isTaskLoadingA ? "owo" : assignmentAmt}
          taskCategory={"Assignment"}
          gridArea={"C"}
          parentFilter={parentFilter}
          onClickHandler={() => parentSetFilter(parentFilter === 3 ? 0 : 3)}
        />
      </div>
    </div>
  );
};

export default QuickAccess;
