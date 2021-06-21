import { UserInterface } from "../interfaces/interfaces";
import { getHeaders } from "../components/signInFuncs";
import { reportErr } from "./util";

/**
 * @function Returns a list of courses that the requesting user is permitted to view,
 *  restricted to those that match the request. Returned courses are ordered by creation time,
 *  with the most recently created coming first.
 * @param dispatch is a regular dispatch function from a reducer
 * @param callbackDispatch is an optional callback function to overload the function.
 * @param setLoading helps the ui by setting the function to empty string "" when done
 */
async function getAllCourses<T>(dispatch: Function): Promise<T[]> {
  try {
    await fetch(`https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE&key=${process.env.REACT_APP_API_KEY}`, { headers: getHeaders() })
      .then(response => response.json())
      .then((res: any) => dispatch({ type: 'SET_COURSES', payload: res.courses }))
      .catch((error: any) => {
        throw new Error(error);
      });
    dispatch({ type: 'SET_LOADING', payload: "" });

  } catch (error) {
    console.log(error)
    reportErr('getAllCourses', '', error)
    dispatch({ type: 'SET_LOADING', payload: "" });
  }
  return [];
}
/**
 * Returns an array of courses that the requesting user is permitted to view,
 *  restricted to those that match the request. Returned courses are ordered by creation time,
 *  with the most recently created coming first.
 * @param dispatch is a regular dispatch function from a reducer
 */
async function getCoursesArray<T>(dispatch: Function): Promise<T[]> {
  let results: Array<T> = [];
  try {
    await fetch(`https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE&key=${process.env.REACT_APP_API_KEY}`, { headers: getHeaders() })
      .then(response => response.json())
      .then((res: any) => {
        if (res.courses) {
          results = res.courses;

        } else {
          reportErr('getCoursesArray', '', 'There were no classrooms to do this operations upon.')
          // dispatch({ type: 'SET_LOADING', payload: "" });
        }
      })
      .catch((error: any) => {
        throw new Error(error);
      });

  } catch (error) {
    console.log(error)
    reportErr('getCoursesArray', '', error)
  }
  return results;
}

/**
 * @param id  Identifier of the course to return. This identifier can be either
 * the Classroom-assigned identifier or an alias.
 * @param profile the profile of the current user.
 * @param dispatch a callback function that changes the state ither for selectedcourse or error
 * @returns a course object and sets the state at the same time.
 */
async function getCourse(id: string, profile: { user: UserInterface; }, dispatch: Function): Promise<object | null> {
  if (id === "")
    id = 'no id provided';
  dispatch({ type: 'SET_SELECTED_CLASSROOM', payload: null });
  try {
    await fetch(`https://classroom.googleapis.com/v1/courses/${id}?key=${process.env.REACT_APP_API_KEY}`, { headers: getHeaders() })
      .then(response => response.json())
      .then((res: any) => {
        const modifiedRes = { dateItWasSaved: new Date(), user: profile.user, ...res };
        dispatch({ type: 'SET_SELECTED_CLASSROOM', payload: modifiedRes });
        localStorage.setItem('selectedClassroom', JSON.stringify(modifiedRes));
      })
      .catch((er: any) => { throw new Error(er); });
    dispatch({ type: 'SET_LOADING', payload: "" });
  } catch (error) {
    console.log(error)
    reportErr('getCoursesArray', id, error)
    dispatch({ type: 'SET_LOADING', payload: "" });
  }
  return null;
}

export { getCourse, getAllCourses, getCoursesArray }