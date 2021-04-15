/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from "react";
import styles from "../App.module.scss";
import { Context } from "../store/store";
import { getAssignments } from "../requestFunctions/assignmentsRequest";
import { FaCircleNotch } from "react-icons/fa";
import Table from "../components/Table";

export default function CourseBlueprint() {
  const [state, dispatch] = useContext(Context);
  const { assignments, selectedClassroom, topics } = state;
  const [loading, setLoading] = useState(false);

  return (
    <>
      <section className={styles.container}>
        <h2>Blueprint From Selected Classroom</h2>
     
        <div className={styles.list}>
          <Table
            title={"Topics"}
            selection={["courseId", "topicId", "name"]}
            items={topics}
          ></Table>

          <Table
            title={"Assignments and materials"}
            selection={["courseId", "id", "title", "state"]}
            items={assignments}
          ></Table>
        </div>
        <div className={styles.list}>
        <p>If you notice that the data in these tables is outdated and you are logged in in the account where you have the classroom blueprint, you can refresh the content.</p>
        <button
          type="button"
          className={`${styles.yellow} ${styles.btnSmall}`}
          onClick={() => {
            selectedClassroom && getAssignments(selectedClassroom.id, dispatch);
            setLoading(true);
          }}
          disabled={!state.isLoggedIn || loading}
        >
          {!loading ? (
            <span> Fetch or Refresh Blueprint ⚡</span>
          ) : (
            <FaCircleNotch size={30} className={styles.spin} />
          )}
        </button>
        </div>
      </section>
    </>
  );
}
