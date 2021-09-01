import React, { useCallback, useContext, useEffect } from "react";
import ReactPDF, { PDFDownloadLink } from "@react-pdf/renderer";
import styles from "../App.module.scss";
import MyDocument from "../components/ErrorLogToPDF";
import Table from "../components/Table";
import { useAppSelector } from "../store/hooks";
import { selectError } from "../store/slices/errorSlice";
import { Context } from "../store/store";


export default function Home() {
  const [state,] = useContext(Context);
  const {profile} = state;
  const errors = useAppSelector(selectError);
  
  useEffect(() => {
    document.title = "GCboss Error Log";
    return () => {};
  }, []);
  const getErrCb = useCallback(() => {
    return errors
  }, [errors])
  const getPfCb = useCallback(() => {
    return profile
  }, [
    
  ])
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
        <PDFGen getErrors={getErrCb} getProfile={getPfCb} />
      </main>
    </>
  );
}


const PDFGen = React.memo((props:{getErrors:Function, getProfile:Function}) => {
  const errors = props.getErrors()
  const profile = props.getProfile()
  return (
    <div >
         {errors.length ? (
          <PDFDownloadLink document={<MyDocument errCb={props.getErrors}  title={`Errors from account ${profile.user.emailAddress}`}/>} fileName={`Errors from account ${profile.user.emailAddress.split('@')[0]}`}>
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download now!'
          }
        </PDFDownloadLink>
        ) : null}
    </div>
  )
})