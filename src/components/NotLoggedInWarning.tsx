import React, { useContext } from "react";
import { useLocation } from "react-router";
import { Context } from "../store/store";
import {ImWarning} from 'react-icons/im'
export default function NotLoggedInWarning() {
  const { pathname } = useLocation();
  const [state] = useContext(Context);
  return (
    <div>{!state.isLoggedIn && pathname !== "/" ? <div> <ImWarning/> {" "} You should sign in to do these operations!</div> : null}</div>
  );
}
