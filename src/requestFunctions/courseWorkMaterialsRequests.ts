import {  StateInterface } from "../interfaces/interfaces";
import { getHeaders } from "../components/signInFuncs";
/**
 * Creates a course work material.
 * @param courseId 
 * @param state 
 * @param dispatch 
 * @returns 
 */
async function createCourseWorkMaterials(courseId: string, state: StateInterface, dispatch: Function) {
  const {  assignment } = state;
  const requestBody: BodyInit = JSON.stringify(assignment);
  try {
    await fetch(`https://classroom.googleapis.com/v1/courses/${courseId}/courseWorkMaterials?key=${process.env.REACT_APP_API_KEY}`, { method: "POST", headers: getHeaders(), body: requestBody })
      .then(async (res) => {
        if (!res.ok) {
          const er = await res.json();
          throw new Error(er.error.message);
        }
        return res.json();
      })
      .then(async (res: any) => {
        // dispatch({ type: 'SET_LOGS', payload: [{ type: logTypes.MATERIAL, id: res.id }, ...logs] });
      })
      .catch((er: any) => { throw new Error(er); });
    // dispatch({ type: 'SET_LOADING', payload: "" });
  } catch (error) {
    console.log(error)
    // dispatch({ type: 'SET_LOADING', payload: "" });
    // dispatch({
    //   type: 'SET_ERROR', payload: [{ message: error.message }]
    // });
  }
}
/**
 * Returns a list of course work material that the requester is permitted to view.
 * @param id 
 * @returns 
 */
async function getCourseWorkMaterials<T>(id: string) {
  let results: Array<T> = [];
  await fetch(`https://classroom.googleapis.com/v1/courses/${id}/courseWorkMaterials?courseWorkMaterialStates=PUBLISHED&courseWorkMaterialStates=DRAFT&orderBy=updateTime%20desc&key=${process.env.REACT_APP_API_KEY}`, { headers: getHeaders() })
    .then(response => response.json())
    .then(async (res: any) => {
      results = res.courseWorkMaterial;
    })
    .catch((er: any) => { throw new Error(er); });

  return results;
}

/**
 * Deletes a course work material.
 * This request must be made by the Developer Console project of the OAuth client ID used
 * to create the corresponding course work material item.
 * @param courseId 
 * @param state 
 * @param dispatch 
 */
async function deleteCourseWorkMaterials(courseId: string,id: string, state: StateInterface, dispatch: Function) {
  try {
    await fetch(`https://classroom.googleapis.com/v1/courses/${courseId}/courseWorkMaterials/${id}?key=${process.env.REACT_APP_API_KEY}`,
      { method: "DELETE", headers: getHeaders() })
      .then(async (res) => {
        if (!res.ok) {
          const er = await res.json();
          throw new Error(er.error.message);
        }
        await Promise.resolve(setTimeout(() => {}, 1000 ))
        return res.json();
      })
      .then(async (res: any) => {
        // dispatch({ type: 'SET_LOGS', payload: [{ type: logTypes.ASSIGMENT, id: res.id }, ...logs] });
      })
      .catch((er: any) => { throw new Error(er); });
    // dispatch({ type: 'SET_LOADING', payload: "" });
  } catch (error) {
    console.log(error)
    // dispatch({ type: 'SET_ERROR', payload: [{ message: error.message }] });
    // dispatch({ type: 'SET_LOADING', payload: "" });
  }
}

export { createCourseWorkMaterials, getCourseWorkMaterials, deleteCourseWorkMaterials }