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
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10 },
});

export default function MyDocument(props: {
  errors: ErrorState[];
  title: string;
}) {
  const { errors, title } = props;
  return ( <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.table}>
          <View style={styles.section} break>
            <Text>{title}</Text>
          </View>

          <View style={styles.tableRow} break>
            <View style={styles.tableCol} wrap>
              <Text style={styles.tableCell} wrap>
                courseId
              </Text>
            </View>
            <View style={styles.tableCol} wrap>
              <Text style={styles.tableCell} wrap>
                message
              </Text>
            </View>
            <View style={styles.tableCol} wrap>
              <Text style={styles.tableCell} wrap>
                comingFrom
              </Text>
            </View>
            <View style={styles.tableCol} wrap>
              <Text style={styles.tableCell} wrap>
                date
              </Text>
            </View>
          </View>

          {errors.map((error) => (
            <View style={styles.tableRow} break>
              <View style={styles.tableCol} wrap>
                <Text style={styles.tableCell} wrap>
                  {error.id}
                </Text>
              </View>
              <View style={styles.tableCol} wrap>
                <Text style={styles.tableCell} wrap>
                  {error.message}
                </Text>
              </View>
              <View style={styles.tableCol} wrap>
                <Text style={styles.tableCell} wrap>
                  {error.comingFrom}
                </Text>
              </View>
              <View style={styles.tableCol} wrap>
                <Text style={styles.tableCell} wrap>
                  {error.date}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
