import React, { useEffect } from "react";
import styles from "../App.module.scss";


export default function Home() {

  useEffect(() => {
    document.title = "Google Classroom API Manager";
    return () => {};
  }, []);
  return (
    <>
      <main className={styles.mainContainer}>
        <h2>Welcome to Easy access to Google Classroom</h2>
        <p>
          This is an App that allows you to copy all the assignments and topics
          from a selected classroom to as many classrooms as needed even if they
          are in a different account.
        </p>
      </main>
    </>
  );
}
