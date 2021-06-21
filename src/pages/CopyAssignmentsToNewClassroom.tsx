import React, { useContext} from "react";
import styles from "../App.module.scss";
import {IoArrowUndoCircleSharp,} from 'react-icons/io5'
import {FaRobot,FaRegCopy, FaUndoAlt} from 'react-icons/fa'
import {FiDownloadCloud} from 'react-icons/fi'
import {GiHand} from 'react-icons/gi'
import {SiProbot } from 'react-icons/si'

import {
  createAssignments,
  undoOldActions,
} from "../requestFunctions/assignmentsRequest";
import { createTopics } from "../requestFunctions/topicRequests";
import { Context } from "../store/store";
// import Table from "../components/Table";
import Progress from "../components/Progress";
import {getAllCourses,getCoursesArray} from "../requestFunctions/courseRequests";
import BtnLoad from "../components/BtnLoad";
import { CourseInterface} from "../interfaces/interfaces";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {incrementProgress, selectProgress, setTotal, selectTotal} from '../store/slices/progressSlice';

export default function CopyAssignmentsToNewClassroom() {
  const progress = useAppSelector(selectProgress);
  const total = useAppSelector(selectTotal);
  const dispatchRedux = useAppDispatch();
  const [state, dispatch] = useContext(Context);
  const { courses } = state;
  async function chainedActions() {
    try {
      
      const coursesToBeEdited: CourseInterface[] = await getCoursesArray<CourseInterface>( dispatch);
      dispatchRedux(setTotal(coursesToBeEdited.length))
      for (let i = 0; i < coursesToBeEdited.length; i++) {
          const selectedAssignments = JSON.parse( localStorage.getItem("selectedAssignments") || "" ) as [];
          const selectedTopics = JSON.parse(localStorage.getItem("selectedTopics") || "") as [];
          const courseReceivingChange = coursesToBeEdited[i];
          
        await createTopics(courseReceivingChange.id, state, dispatch);

         createAssignments(
            courseReceivingChange.id,
            selectedAssignments,
            selectedTopics,
            state,
            dispatch
          );
          dispatchRedux(incrementProgress(1));
        }
        dispatch({ type: "SET_LOADING", payload: "" });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className={styles.mainContainerCopy}>
      <h2>CopyAssignments</h2>
      <div>
        <ol className={`${styles.cols} ${styles.list}`}>
          <h3>Manual Process <GiHand/></h3>
          <li>
            <p>Get the list of all your classrooms</p>

            <BtnLoad
              action={getAllCourses}
              identifier="button-1"
              text="Load my Classrooms"
              Icon={FiDownloadCloud}
            />
            {courses && courses.length ? (
              <Progress value={courses.length} total={courses.length} />
            ) : null}
          </li>

          <li>
            <p>Copy the topics from blueprint to your classrooms</p>
            <BtnLoad
              action={createTopics}
              identifier="button-2"
              text="Copy Topics"
              Icon={FaRegCopy}
            />
          </li>

          <li>
            <p>Copy the assignments from blueprint to your classrooms</p>
            <BtnLoad
              action={createAssignments}
              identifier="button-3"
              text="Copy Assignments"
              Icon={FaRegCopy}
              />
          </li>
        </ol>
        <hr />

        <div className={`${styles.cols} ${styles.list}`}>
          <h3>Automatic Process <FaRobot/></h3>
          <BtnLoad
            action={chainedActions}
            identifier="button-4"
            text="😏copy entire blueprint😏"
            Icon={SiProbot}
            />
        </div>
            {(total) ?<Progress value={progress} total={total} />:null} 
        <div>
        <hr />
        <div className={`${styles.cols} ${styles.list}`}>
          <h3> Undo the previous operations <IoArrowUndoCircleSharp/></h3>
          <BtnLoad
            action={() => undoOldActions(state, dispatch)}
            identifier="button-5"
            text="undo actions"
            classNames={styles.red}
            Icon={FaUndoAlt}
          />
          </div>
        </div>
      </div>
      {/* <h4>monitor operations</h4>
      <h5>⬇</h5>
      <div>
        <Table
          title={"Classrooms in my account"}
          items={courses}
          selection={["name", "completed", "id", "section"]}
        />
      </div> */}
    </section>
  );
}
