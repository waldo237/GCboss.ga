import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import CourseBlueprint from "../pages/CourseBlueprint";
import CopyAssignmentsToNewClassroom from "../pages/CopyAssignmentsToNewClassroom";
import Courses from "../pages/Courses";
export default function Routes() {
  return (
    <main>
      <Switch>
      <Route path="/" exact>
      <Home />
        </Route>
        <Route path="/actions" exact>
          <Home />
        </Route>
        <Route path="/ListofClassrooms" exact>
          <Courses />
        </Route>
        <Route path="/CourseBlueprint">
          <CourseBlueprint />
        </Route>
        <Route path="/CopyAssignmentsToNewClassroom"><CopyAssignmentsToNewClassroom/></Route>
       
      </Switch>
    </main>
  );
}
