import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./App.module.scss";
import ErrorCard from "./components/ErrorCard";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Routes from "./components/Routes";
import SelectedClassroom from "./components/SelectedClassroom";
import { loadAuth, signIn } from "./components/signInFuncs";
import { Context } from "./store/store";
import { useLocation } from 'react-router-dom'
import NotLoggedInWarning from "./components/NotLoggedInWarning";

function App() { 
  const {pathname} = useLocation();
  const [, dispatch] = useContext(Context);

  useEffect(() => {
    window.addEventListener("load", (e) => {
      const savedCourse = localStorage.getItem("selectedClassroom");
      if (savedCourse)
        dispatch({
          type: "SET_SELECTED_CLASSROOM",
          payload: JSON.parse(savedCourse),
        });

      const savedAssignments = localStorage.getItem("selectedAssignments");
      if (savedAssignments)
        dispatch({
          type: "SET_SELECTED_ASSIGNMENTS",
          payload: JSON.parse(savedAssignments),
        });
      const savedTopics = localStorage.getItem("selectedTopics");
      if (savedTopics)
        dispatch({
          type: "SET_SELECTED_TOPICS",
          payload: JSON.parse(savedTopics),
        });

      loadAuth(dispatch);
      if (pathname !== '/') signIn(dispatch,);
    });
  }, []);

  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  return (
    <div>
      <header className={styles.mainHeader}>
        <Link to="/">
          <div>
            <img
              src={process.env.PUBLIC_URL + "/google-classroom.png"}
              alt="google classroom icon"
            />
            <h1>GCboss</h1>
          </div>
        </Link>

        <ErrorCard />
        <SelectedClassroom />
        <Nav />
        <NotLoggedInWarning/>
      </header>
      <>
        <Routes />
      </>
      <Footer />
    </div>
  );
}

export default App;
