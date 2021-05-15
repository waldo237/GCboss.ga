import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import styles from "../App.module.scss";

import { BiLogIn, BiCopy, BiLogOut, BiError } from "react-icons/bi";
import { MdAssignment } from "react-icons/md";
import { BsCardChecklist } from "react-icons/bs";
import { Context } from "../store/store";
import Avatar from "./Avatar";
import Dashboard from "./Dashboard";
import { signIn, signOut } from "./signInFuncs";
function Nav() {
  const [state, dispatch] = useContext(Context);
  const { profile: user } = state;
  const {pathname} = useLocation()
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/ListofClassrooms">
              <BsCardChecklist /> List of Classrooms
            </Link>
          </li>

          <li>
            <Link to="/CourseBlueprint">
              {" "}
              <MdAssignment /> Classroom Blueprint
            </Link>
          </li>
          <li>
            <Link to="/CopyAssignmentsToNewClassroom">
              {" "}
              <BiCopy /> Copy Blueprint to your Classrooms
            </Link>
          </li>
          <li>
            <Link to="/errorLog">
              {" "}
              <BiError /> Error Log
            </Link>
          </li>
          <li>
            <div className={styles.avatarBtn} onClick={()=> dispatch({type:'SET_PROFILE_DASHBOARD', payload: !state.profileDashboard})}>
              <Avatar size={45} user={user.user} />
            </div>
          </li>
          <li>
            {!state.isLoggedIn ? (
              <button
                type="button"
                className={`${styles.blue} ${styles.btnSmall} ${styles.vibration}`}
                onClick={() => signIn(dispatch, '/home')}
              >
                <BiLogIn /> Sign in
              </button>
            ) : (
              <button
                type="button"
                className={`${styles.red} ${styles.btnSmall}`}
                onClick={() => signOut(dispatch)}
              >
                <BiLogOut /> Sign out
              </button>
            )}
          </li>
        </ul>
        {(state.profileDashboard && state.isLoggedIn  )? <Dashboard />:null}
      </nav>
    </>
  );
}

export default Nav;
