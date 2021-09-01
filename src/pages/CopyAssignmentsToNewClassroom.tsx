import React, { useContext } from "react";
import styles from "../App.module.scss";
import { IoArrowUndoCircleSharp } from "react-icons/io5";
import { FaRobot, FaRegCopy, FaUndoAlt } from "react-icons/fa";
import { FiDownloadCloud } from "react-icons/fi";
import { GiHand } from "react-icons/gi";
import { SiProbot } from "react-icons/si";

import {
  createAssignments,
  undoOldActions,
} from "../requestFunctions/assignmentsRequest";
import { createTopics } from "../requestFunctions/topicRequests";
import { Context } from "../store/store";
import Progress from "../components/Progress";
import {
  getAllCourses,
  getCoursesArray,
} from "../requestFunctions/courseRequests";
import BtnLoad from "../components/BtnLoad";
import {
  AssignmentInterface,
  CourseInterface,
  TopicInterface,
} from "../interfaces/interfaces";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  incrementProgress,
  selectProgress,
  setTotal,
  selectTotal,
} from "../store/slices/progressSlice";
import { stopLoadingButton } from "../requestFunctions/util";
import ToolTip from "../components/ToolTip";

export default function CopyAssignmentsToNewClassroom() {
  const progress = useAppSelector(selectProgress);
  const total = useAppSelector(selectTotal);
  const dispatchRedux = useAppDispatch();
  const [state, dispatch] = useContext(Context);
  const { courses } = state;
  const mOMsj =
    "Please load target classrooms before doing this manual operation.";

  async function chainedActions() {
    try {
      const coursesToBeEdited: CourseInterface[] = await getCoursesArray(
        dispatch
      );

      dispatchRedux(setTotal(coursesToBeEdited.length));

      const selectedTopics = JSON.parse(
        localStorage.getItem("selectedTopics") || ""
      ) as TopicInterface[];

      for (let i = 0; i < coursesToBeEdited.length; i++) {
        const courseReceivingChange = coursesToBeEdited[i];
        const selectedAssignments = JSON.parse(
          localStorage.getItem("selectedAssignments") || ""
        ) as AssignmentInterface[];

        await createTopics(courseReceivingChange.id, state, dispatch);

        //throttle to deal with Google quota
        createAssignments(
          courseReceivingChange.id,
          selectedAssignments,
          selectedTopics,
          state,
          dispatch
        );

        dispatchRedux(incrementProgress(1));
      }
      stopLoadingButton();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className={styles.mainContainerCopy}>
      <h2>CopyAssignments</h2>
      <div>
        <ol className={`${styles.cols} ${styles.list}`}>
          <h3>
            Manual Process <GiHand />
          </h3>
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
            <ToolTip text={mOMsj} enable={courses.length === 0}>
              <BtnLoad
                action={async () => {
                  await courses.forEach((c: CourseInterface) => {
                    createTopics(c.id, state, dispatch);
                  });
                  stopLoadingButton();
                }}
                identifier="button-2"
                text="Copy Topics"
                Icon={FaRegCopy}
                disableOn={courses.length === 0}
              />
            </ToolTip>
          </li>

          <li>
            <p>Copy the assignments from blueprint to your classrooms</p>
            <ToolTip text={mOMsj} enable={courses.length === 0}>
              <BtnLoad
                action={async () => {
                  await courses.forEach((c: CourseInterface) => {
                    const selectedAssignments = JSON.parse(
                      localStorage.getItem("selectedAssignments") || ""
                    ) as [];
                    const selectedTopics = JSON.parse(
                      localStorage.getItem("selectedTopics") || ""
                    ) as [];
                    createAssignments(
                      c.id,
                      selectedAssignments,
                      selectedTopics,
                      state,
                      dispatch
                    );
                  });
                  stopLoadingButton();
                }}
                identifier="button-3"
                text="Copy Assignments"
                Icon={FaRegCopy}
                disableOn={courses.length === 0}
              />
            </ToolTip>
          </li>
        </ol>
        <hr />

        <div className={`${styles.cols} ${styles.list}`}>
          <h3>
            Automatic Process <FaRobot />
          </h3>
          <BtnLoad
            action={chainedActions}
            identifier="button-4"
            text="😏copy entire blueprint😏"
            Icon={SiProbot}
          />
        </div>
        {total ? <Progress value={progress} total={total} /> : null}
        <div>
          <hr />
          <div className={`${styles.cols} ${styles.list}`}>
            <h3>
              {" "}
              Undo the previous operations <IoArrowUndoCircleSharp />
            </h3>
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
    </section>
  );
}
