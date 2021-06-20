import { AssignmentInterface, CourseInterface, StateInterface, TopicIdsInterface, TopicInterface } from "../interfaces/interfaces";
import { deleteTopic, getAllTopics, getTopicArray } from "./topicRequests";
import { getHeaders } from "../components/signInFuncs";
import { createCourseWork, deleteCourseWork } from "./classWorkRequests";
import { createCourseWorkMaterials, deleteCourseWorkMaterials, getCourseWorkMaterials } from "./courseWorkMaterialsRequests";
import { getCoursesArray } from "./courseRequests";

/**
 * Returns a list of course work and course work material that the requester is permitted to view.
 * @param id
 * @param dispatch
 * @returns
 */



async function getAssignments(id: string, dispatch: Function) {
  if (!id)
    return dispatch({ type: 'SET_ERROR', payload: [{ message: 'no id was provided to assignment function.' }] });
  dispatch({ type: 'SET_SELECTED_ASSIGNMENTS', payload: null });
  try {
    return await fetch(`https://classroom.googleapis.com/v1/courses/${id}/courseWork?courseWorkStates=PUBLISHED&courseWorkStates=DRAFT&orderBy=updateTime%20desc&key=${process.env.REACT_APP_API_KEY}`, { headers: getHeaders() })
      .then(response => response.json())
      .then(async (res: any) => {
        const assignments = await res.courseWork;
        const materials = await getCourseWorkMaterials(id); //materials are different from courseWork that's why We also call this function.

        dispatch({ type: 'SET_SELECTED_ASSIGNMENTS', payload: [...assignments || [], ...materials || []] });
        localStorage.setItem('selectedAssignments', JSON.stringify([...assignments || [], ...materials || []]));
      })
      .then(() => getAllTopics(id, dispatch)) // we call the following function to store the classwork in the state and local storage.
      .catch((er: any) => { throw new Error(er); });

  } catch (error) {
    // dispatch({ type: 'SET_ERROR', payload: [{ message: error.message }] });
    console.log(error)
  }

}

async function getAssignmentArray(courseId: string, dispatch: Function) {
  let results: Array<AssignmentInterface> = [];
  try {
    await fetch(`https://classroom.googleapis.com/v1/courses/${courseId}/courseWork?courseWorkStates=DRAFT&courseWorkStates=PUBLISHED&key=${process.env.REACT_APP_API_KEY}`, { headers: getHeaders() })
      .then(response => response.json())
      .then(async (res: any) => {
        const assignments = await res.courseWork;
        const materials = await getCourseWorkMaterials(courseId);

        results = [...assignments || [], ...materials || []];
      });

  } catch (error) {
    console.log(error)
    //  dispatch({
    // type: 'SET_ERROR', payload: [{ message: error.message }]
    // });
  }
  return results;
}

async function createAssignments(courseId: string,
  selectedAssignments: AssignmentInterface[], selectedTopics: TopicInterface[],
  state: StateInterface, dispatch: Function) {
  const targetTopics = await getTopicArray(courseId, dispatch);
  // console.log(`selectedAssignments`, typeof selectedAssignments)
  // console.log(`selectedTopics`, typeof selectedTopics)
  // let breaker: boolean = false;
 
  try {
    for await (const assignment of selectedAssignments) {
      const selectedTopic = selectedTopics.find((topic) => topic.topicId === assignment.topicId)
      // console.log(`before selectedTopic`, selectedTopic)
      if (selectedTopic) {

        // console.log('ids comparizon', `${selectedTopic.topicId}-- ${assignment.topicId}`)
        // if (selectedTopic.topicId === assignment.topicId) {
        const targetTopic = targetTopics.filter((targetTopic) => targetTopic.name === selectedTopic.name)[0]
        // console.log('name comparizon', `${targetTopic.name}-- ${selectedTopic.name}`)

        // console.log('targetTopic', targetTopic.topicId)
        delete assignment['id']; //delete the id because is an invalid argument
        delete assignment['courseId']; //delete the courseId because is an invalid argument
        delete assignment['creatorUserId']; //delete the courseId because is an invalid argument

        //  const { topicId } = assignment;
        // let tempTopicId = targetCourseTopicIds[topicId]; //get the associate value with that key
        //  const tempTopicId = sessionStorage.getItem(`${courseId}=${topicId}`)

        assignment.topicId = targetTopic.topicId;

        //swap the value before sending the request.
        if (!assignment['workType']) {
          await createCourseWorkMaterials(courseId, { ...state, assignment }, dispatch); //mock
          // console.log('createCourseWorkMaterials', `${assignment.topicId}--- ${assignment.title}`)

        } else {
          // console.log('createCourseWork', `${assignment.topicId}--- ${assignment.title}`)
          await createCourseWork(courseId, { ...state, assignment }, dispatch); //mock

        }
      }
    }
  } catch (error) {
    console.log(error)
    // dispatch({ type: 'SET_ERROR', payload: [{ message: error.message }, ...state.error] });
  }
}


async function undoActions(state: StateInterface, dispatch: Function) {
  throw new Error('TODO, NOTHING IS IMPLEMENTED IN THIS FUNCTION')
}

/**
 * Filters the assignments and topics from the blueprint. If there is an assignments or topics
 * with a title from the filtered data, it will be deleted. 
 * @param state 
 * @param dispatch 
 */
async function undoOldActions(state: StateInterface, dispatch: Function) {
  const coursesToBeEdited = await getCoursesArray<CourseInterface>(dispatch);
  const { assignments: localAssignments, topics: localTopics, error } = state;

  const titlesFromlocalAssignments = localAssignments.map((courseWork: AssignmentInterface) => courseWork.title); //titles from locally saved array of assignments
  const titlesFromLocalTopics = localTopics.map((topic: TopicIdsInterface) => topic.name); //titles from locally saved array of topics
  let topicAccumulator: any = {};
  let breaker: boolean = false;

  try {
    coursesToBeEdited.forEach(async (courseToBeEdited) => {
      const targetAssignments = await getAssignmentArray(courseToBeEdited.id, dispatch);
      const targetTopics = await getTopicArray(courseToBeEdited.id, dispatch);

      for (const assignment of targetAssignments) {
        if (!breaker) { // if there is an error, break out of the loop.
          const { id, title } = assignment;
          if (titlesFromlocalAssignments.includes(title)) { //delete assignments if they have the title.
            if (!assignment['workType']) {//if, they don't have worktype, they are materials.
              await deleteCourseWorkMaterials(courseToBeEdited.id, id!, state, dispatch) //mock
            } else {
              await deleteCourseWork(courseToBeEdited.id, id!, state, dispatch); //mock
            }
            await Promise.resolve(setTimeout(() => {}, 2000))
          }
        }
        breaker = error.length > 0;
      }
      //delete Topics
      if (targetTopics) {
        for (const topic of targetTopics) {
          if (!breaker) {
            const { name, topicId } = topic;
            if (titlesFromLocalTopics.includes(name)) {
              await deleteTopic(courseToBeEdited.id, topicId!, state, dispatch)
              topicAccumulator[topicId] = true;
            }
          }
          breaker = error.length > 0;
        }
      }
      dispatch({ type: 'SET_LOADING', payload: "" });
    })
  } catch (error) {
    console.log(error)
    // dispatch(setError([{ message: error.message }, ...error] ));
    // dispatch({ type: 'SET_ERROR', payload: [{ message: error.message }] });
  }
}

export { createAssignments, getAssignmentArray, getAssignments, undoActions, undoOldActions }