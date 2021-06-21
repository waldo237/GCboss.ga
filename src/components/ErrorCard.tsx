import React, { useEffect, useRef } from "react";
import styles from "../App.module.scss";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useAppSelector } from "../store/hooks";
import { clearErrors, selectError, selectErrShow, toggle } from "../store/slices/errorSlice";
import { storeRedux } from "../store/storeRedux";
import { AiOutlineClear } from "react-icons/ai";
const dispatchRedux = storeRedux.dispatch;
export default function ErrorCard() {
  const tgErrCard = ()=> dispatchRedux(toggle(false));
  const clrErros =()=> dispatchRedux(clearErrors([]));
const error = useAppSelector(selectError)
const show = useAppSelector(selectErrShow)
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  return (
    <>
      {(show && error.length) ? (
        <div  className={styles.errorCard}>
          <div className={styles.errorCardCloseBtn}>
            <IoIosCloseCircleOutline
              type="button"
              onClick={tgErrCard}
            />
          </div>
            <button onClick={clrErros} className={`${styles.btnSmall} ${styles.blue}`}>
              
            <AiOutlineClear/> clear errors
            </button>
          <h3> Error Log</h3>
          <ol>
            {error.map((err: { message: string }, i: number) => (
              <li key={i}>{err.message}</li>
            ))}
          </ol>
        </div>
      ) : null}
    </>
  );
}
