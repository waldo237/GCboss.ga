import React, { useContext } from "react";
import { useLocation } from "react-router";
import { Context } from "../store/store";
import {ImWarning} from 'react-icons/im'
export default function NotLoggedInWarning() {
  const { pathname } = useLocation();
  const [state] = useContext(Context);
  const style = {
    margin: ' 5% auto',
    padding: ' 20px'
    
  }
  return (
    <div >{!state.isLoggedIn && pathname !== "/" ? <h3 style={style}> <ImWarning/> {" "} You should sign in to do these operations!</h3> : null}</div>
  );
}
