import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { ErrorState } from "../store/slices/errorSlice";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  column: {
    flexDirection: "column",
    margin: 5,
    padding: 5,
    flexGrow: 1,
  },
  row: {
    flexDirection: "row",
    margin: 5,
    padding: 5,
    flexGrow: 1,
  },
});



export default function MyDocument(props: { errors: ErrorState[] }) {
  const { errors } = props;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>errors</Text>
        </View>
        {errors.map((error) => (
          <View style={styles.row}>
            <View style={styles.column}>
              <Text>{error.courseId}</Text>
            </View>
            <View style={styles.column}>
              <Text>{error.message}</Text>
            </View>
            <View style={styles.column}>
              <Text>{error.comingFrom}</Text>
            </View>
            <View style={styles.column}>
              <Text>{error.date}</Text>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
}
