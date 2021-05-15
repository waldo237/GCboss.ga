import React, { useEffect } from "react";
import styles from "../App.module.scss";


export default function Home() {

  useEffect(() => {
    document.title = "Home - GCboss - a manager tool for Google Classrooms";
    return () => {};
  }, []);
  return (
    <>
      <main className={styles.mainContainer}>
        <h2>Welcome to GCboss</h2>
        <h3>Manage Google Classrooms in bulk!</h3>
        <p>
          This is an App that allows you to copy all the assignments and topics
          from a selected classroom to as many classrooms as needed even if they
          are in a different account.
        </p>
      </main>
    </>
  );
}
