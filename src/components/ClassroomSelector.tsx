/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useMemo } from "react";
import styles from "../App.module.scss";
import { getAssignments } from "../requestFunctions/assignmentsRequest";
import { getCourse } from "../requestFunctions/courseRequests";
import { Context } from "../store/store";
import BtnLoad from "./BtnLoad";



function getInput(e: any, dispatch:Function) {
  e.preventDefault();
  dispatch({type:'SET_COURSE_ID', payload:e.target.value});
}

export default function ClassroomSelector() {
  const [state, dispatch] = useContext(Context)

 const {courses, courseId,profile, selectedClassroom} = state;
  const courseIds = courses ? courses.map((c: any) => c.id) : [];
  const memoizedCourseId = useMemo(() => courseId, [courseId]);
  return (
    <section className={styles.cols}>
      <select
        name="courseId"
        onChange={(e) => getInput(e, dispatch)}
        value={memoizedCourseId || "default"}
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

      <BtnLoad
        
        action={() => {
          getCourse(courseId, profile, dispatch)
            .then(() => {
              if (selectedClassroom) getAssignments(selectedClassroom.id, dispatch);
            })
            .catch((err) => dispatch({ type: 'SET_ERROR', payload: ([{ message: err.message }])}));
        }}
        directCallback
        identifier="model-selector"
        text="Select as model"
      />
    </section>
  );
}
