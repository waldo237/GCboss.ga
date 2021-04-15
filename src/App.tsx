import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./App.module.scss";
import ErrorCard from "./components/ErrorCard";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Routes from "./components/Routes";
import SelectedClassroom from "./components/SelectedClassroom";
import { signIn } from "./components/signInFuncs";
import { Context } from "./store/store";


function loadAuth(dispatch:Function) {
  // eslint-disable-next-line no-restricted-globals
  var fragmentString = location.hash.substring(1);
  var params: any = {};
  var regex = /([^&=]+)=([^&]*)/g,
    m;
  while ((m = regex.exec(fragmentString))) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  if (Object.keys(params).length > 0) {
    localStorage.setItem("oauth2", JSON.stringify(params));
    if (params["state"] && params["state"] === "try_sample_request") {
      signIn(dispatch);
    }
  }
}
function App() {
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
      if (savedTopics)dispatch({type: "SET_SELECTED_TOPICS",payload: JSON.parse(savedTopics),});
        loadAuth(dispatch);
        signIn(dispatch);
    });
  }, [dispatch]);

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
            <h1>Google Classroom Admin</h1>
          </div>
        </Link>

        <ErrorCard />
        <SelectedClassroom />
        <Nav />
      </header>
      <>
        <Routes />
      </>
      <Footer />
    </div>
  );
}

export default App;
