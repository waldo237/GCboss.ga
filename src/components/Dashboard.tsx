import React, { useContext } from "react";
import "./Dashboard.scss";
import { FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from "../App.module.scss";
import { Context } from "../store/store";
import Avatar from "./Avatar";
import { signOut } from "./signInFuncs";
import { BiLogOut } from "react-icons/bi";

const Dashboard = () => {
  const [state, dispatch] = useContext(Context);

  return (
    <>
      <div id="dashboard-dialog" className="dash-wrapper">
        <div className="dashboard ">
          <div
            style={{ marginTop: "4px" }}
            className={styles.errorCardCloseBtn}
          >
            <IoIosCloseCircleOutline
              type="button"
              onClick={() =>
                dispatch({
                  type: "SET_PROFILE_DASHBOARD",
                  payload: !state.profileDashboard,
                })
              }
            />
          </div>

          <div className="dashboard-content">
            <div className="dash-user-info ">
              <Avatar user={state.profile.user} size={65} />
              <div>
                <h3 className="">{state.profile.user.displayName}</h3>
              </div>
            </div>
            <div className="dash-action dash-animation">
              <div className=" dash-icon">
                <FaEnvelope />
              </div>
              <h5 className="">{state.profile.user.emailAddress}</h5>
            </div>
            <div className="dash-action dash-animation">
              <div className=" dash-icon">
                <FaSignOutAlt />
              </div>
              <h5 className="dash-action">
              <button
                type="button"
                className={`${styles.red} ${styles.btnSmall}`}
                onClick={() => signOut(dispatch)}
              >
                <BiLogOut /> Sign out
              </button>
          
                </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
