import React, { useContext, useEffect, useRef } from "react";
import { Context } from "../store/store";
import styles from "../App.module.scss";
import { IoIosCloseCircleOutline } from "react-icons/io";
export default function ErrorCard() {
  const [state, dispatch] = useContext(Context);

  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  return (
    <>
      {(state.error.length) ? (
        <div  className={styles.errorCard}>
          <div className={styles.errorCardCloseBtn}>
            <IoIosCloseCircleOutline
              type="button"
              onClick={() => dispatch({ type: "SET_ERROR", payload: [] })}
            />
          </div>
          <h3> Error Log</h3>
          <ul>
            {state.error.map((err: { message: string }, i: number) => (
              <li key={i}>{err.message}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}
