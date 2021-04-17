import React, { useContext, useEffect } from "react";
import ReactPDF, { PDFDownloadLink } from "@react-pdf/renderer";
import styles from "../App.module.scss";
import MyDocument from "../components/ErrorLogToPDF";
import Table from "../components/Table";
import { useAppSelector } from "../store/hooks";
import { selectError } from "../store/slices/errorSlice";
import { Context } from "../store/store";

export default function Home() {
  const errors = useAppSelector(selectError);
  const [state,] = useContext(Context);
  const {profile} = state;
  useEffect(() => {
    document.title = "GCboss Error Log";
    return () => {};
  }, []);
  return (
    <>
      <main className={styles.mainContainer}>
        <h2>Error Log</h2>
        {errors.length ? (
          <Table
            items={errors}
            title={`Errors from account ${profile.user.emailAddress}`}
            selection={["courseId", "date", "message", "comingFrom"]}
          />
        ) : (
          <p>There were not errors in the previous operations!😊</p>
        )}
        {errors.length ? (
          <PDFDownloadLink document={<MyDocument errors={errors}  title={`Errors from account ${profile.user.emailAddress}`}/>} fileName={`Errors from account ${profile.user.emailAddress.split('@')[0]}`}>
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download now!'
          }
        </PDFDownloadLink>
        ) : null}
      </main>
    </>
  );
}
