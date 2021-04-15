import React from "react";
import styles from "../App.module.scss";

export default function Table<T>(props: { items: T[]; selection: string[], title:string }) {
  const { items, selection, title } = props;

  return (
    <>
      {" "}
      <table>
      <caption>{title}</caption>
        <thead>
          <tr className={styles.tr}>
            {selection.map((heading, i) => (
              <th className={styles.th} key={i}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((course: any, j) => (
              <tr className={styles.tr} key={j}>
                {selection.map((heading, i) => (
                  <td key={i}>{course[heading]}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
