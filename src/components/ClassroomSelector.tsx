import React, { useContext } from "react";
import styles from "../App.module.scss";
import {BiSelectMultiple} from 'react-icons/bi'
import { getAssignments } from "../requestFunctions/assignmentsRequest";
import { getCourse } from "../requestFunctions/courseRequests";
import { Context } from "../store/store";
import BtnLoad from "./BtnLoad";
import ToolTip from "./ToolTip";

function getInput(e: any, dispatch: Function) {
  e.preventDefault();
  dispatch({ type: "SET_COURSE_ID", payload: e.target.value });
}

export default function ClassroomSelector() {
  const [state, dispatch] = useContext(Context);
  const { courses, courseId, profile } = state;
  const courseIds = courses ? courses.map((c: any) => c.id) : [];

  return (
    <section className={styles.cols}>
      <ToolTip text='Please load the classrooms before picking.' enable={courseIds&& courseIds.length=== 0}>
      <select
        name="courseId"
        onChange={(e) => getInput(e, dispatch)}
        value={courseId || "default"}
      >
        <option value="default" disabled>
          --pick classroom id of model to start operations...--
        </option>
        {courseIds.map((item: string) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      </ToolTip>
      
      <ToolTip text="You must pick a classroom id first!" enable={courseId === ""} >
        <BtnLoad
          action={() => {
              getCourse(courseId, profile, dispatch)
                .then(() => {getAssignments(courseId, dispatch);})
                .catch((err) =>dispatch({type: "SET_ERROR",payload: [{ message: err.message }],})
                );
          }}
          disableOn={courseId === ""}
          identifier="model-selector"
          text="Select as model"
          Icon={BiSelectMultiple}
        />
      </ToolTip>
    </section>
  );
}
