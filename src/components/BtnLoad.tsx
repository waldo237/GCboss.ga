import React, { useContext } from "react";
import { FaCircleNotch } from "react-icons/fa";
import styles from "../App.module.scss";
import { Context } from "../store/store";
import { selectLoading } from '../store/slices/loadingSlice';
import { labelLoadingngButton } from "../requestFunctions/util";
import { useAppSelector } from "../store/hooks";
export default function BtnLoad(props: {
  action: Function;
  identifier: string;
  text: string;
  classNames?: string;
  directCallback?: boolean;
  disableOn?:boolean,
  Icon?: any
}) {
  const [state, dispatch] = useContext(Context);
  const loading = useAppSelector(selectLoading);
  const { isLoggedIn } = state;
  const { action, identifier, text, classNames, directCallback, disableOn,Icon } = props;
  function isLoading(str: string) {
    return loading === str;
  }
  return (
    <div>
      <button
        type="button"
        className={`${classNames ? classNames : styles.yellow} ${
          styles.btnSmall
        }`}
        onClick={() => {
          directCallback ? action() : action(dispatch);
          labelLoadingngButton(identifier)
        }}
        disabled={!isLoggedIn || isLoading(identifier) || disableOn}
      >
         {!isLoading(identifier) ? (
         <span>{Icon && <Icon/>} {text}</span>
        ) : (
          <FaCircleNotch size={30} className={styles.spin} />
        )}
      </button>
    </div>
  );
}
