import ReactPDF, { PDFViewer,PDFDownloadLink } from "@react-pdf/renderer";
import React, { useEffect } from "react";
import styles from "../App.module.scss";
import BtnLoad from "../components/BtnLoad";
import MyDocument from "../components/ErrorLogToPDF";
import Table from "../components/Table";
import { useAppSelector } from "../store/hooks";
import { selectError } from "../store/slices/errorSlice";

export default function Home() {
  const errors = useAppSelector(selectError);
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
            title={"Current Errors"}
            selection={["courseId", "date", "message", "comingFrom"]}
          />
        ) : (
          <p>There were not errors in the previous operations!😊</p>
        )}
        {errors.length ? (
          // <BtnLoad
          //   action={() =>
          //     () => (
          //       <PDFViewer>
          //         <MyDocument />
          //       </PDFViewer>
          //     )
          //   }
          //   identifier="pdf"
          //   text={"Save error log to PDF"}
          //   directCallback
          // />
          <PDFDownloadLink document={<MyDocument errors={errors} />} fileName="somename.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download now!'
          }
        </PDFDownloadLink>
            
         
        ) : null}
      </main>
    </>
  );
}
