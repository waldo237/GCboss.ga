import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import Reducer from "./Reducer";




const initialState = {
  courses: [],
  assignments: [],
  topics: [],
  targetCourseTopicIds:{},
  courseId: "",
  profile: {},
  isLoggedIn: false,
  profileDashboard: false,
  selectedClassroom: null,
  logs:[]
};
let Context: any;
const Store = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  Context = createContext([initialState, dispatch]);
  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
};
Store.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export { Context, Store };  

