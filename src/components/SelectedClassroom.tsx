import React, { useContext, useState } from "react";
import styles from "../App.module.scss";
import { FiMinimize2, FiMaximize2 } from "react-icons/fi";
import { Context } from "../store/store";
import { formatDistanceToNow } from "date-fns";
import { isDate} from "date-fns/esm";

export default function SelectedClassroom() {
  const [state] = useContext(Context);

  const { selectedClassroom } = state;
  const [minimized, setMinimized] = useState(true);

  if (selectedClassroom) {
    const {
      name,
      id,
      description,
      courseState,
      creationTime,
      user,
      dateItWasSaved,
    } = selectedClassroom;

    return (
      <div className={styles.card}>
        <div className={styles.errorCardCloseBtn}>
          {!minimized ? (
            <FiMinimize2 type="button" onClick={() => setMinimized(true)} />
          ) : (
            <FiMaximize2 type="button" onClick={() => setMinimized(false)} />
          )}
        </div>

        {!minimized && <h2>selected Classrrom</h2>}
        {selectedClassroom && (
          <div className={styles.justifyStart}>
            {!minimized ? (
              <>
                <p>
                  <strong>id:</strong> {id}
                </p>
                <p>
                  <strong>Name:</strong> {name}
                </p>
                <p>
                  <strong>description:</strong> {description}
                </p>
                <p>
                  <strong>courseState:</strong> {courseState}
                </p>
                <p>
                  <strong>creationTime:</strong>{" "}
                  {!isNaN(Date.parse(creationTime)) && formatDistanceToNow(new Date(creationTime), {
                    addSuffix: true,
                  })}
               
                </p>
              </>
            ) : (
              <>
                <small>
                  <strong>name:</strong> {name}
                </small>

                <div className={styles.flexRows}>
                  <small>
                    <strong>Saved by:</strong> {user.emailAddress}
                  </small>
                  <small>
                    <strong>It was saved:</strong>{" "}
                    {!isNaN(Date.parse(dateItWasSaved)) &&  formatDistanceToNow(new Date(dateItWasSaved), {
                      addSuffix: true,
                    })}
                  </small>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
  return null;
}
