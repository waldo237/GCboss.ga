import { StateInterface, TopicInterface } from "../interfaces/interfaces";
import { getHeaders } from "../components/signInFuncs";
import { reportErr, sortByUpdateDate } from "./util";
/**
 * Creates a topic in the specified classroom
 * sets SET_TARGET_TOPIC_IDS with the id of the newly created topic in the target Classroom
 * @param courseId
 * @param topic
 * @param targetCourseTopicIds
 * @param dispatch
 * @param setLoading
 * @throws exception so that it can stop if used in loops
 */
async function createTopic(courseId: string, state: StateInterface, dispatch: Function) {
  const { topic } = state;
  const requestBody: BodyInit = JSON.stringify(topic);
  try {
    await fetch(`https://classroom.googleapis.com/v1/courses/${courseId}/topics?key=${process.env.REACT_APP_API_KEY}`, { method: "POST", headers: getHeaders(), body: requestBody })
      .then(async (res) => {
        if (!res.ok) {
          const er = await res.json();
          throw new Error(er.error.message);
        }
        return res.json();
      })
      .then(async (res: any) => {
        // const { topicId } = topic; //extract the id from the original topic
        // const { topicId: targetTopicId } = res; //extract and rename from the newly created topic
        // await sessionStorage.setItem(`${courseId}=${topicId}`, targetTopicId)
        // targetCourseTopicIds[topicId] = targetTopicId; //save it as a key-value pair to associate it.
        // dispatch({ type: 'SET_TARGET_TOPIC_IDS', payload: { ...targetCourseTopicIds } });
      })
      .catch((er: any) => { throw new Error(er); });
    // dispatch({ type: 'SET_LOADING', payload: "" });
  } catch (error) {
    console.log(error)
    // dispatch({ type: 'SET_LOADING', payload: "" });
    throw error;
  }
}


/**
 * dispatches the list of topics that the requester is permitted to view.
 * @param id 
 * @param dispatch 
 */
async function getAllTopics(id: string, dispatch: Function) {

  dispatch({ type: 'SET_SELECTED_TOPICS', payload: null });
  try {
    await fetch(`https://classroom.googleapis.com/v1/courses/${id}/topics?&key=${process.env.REACT_APP_API_KEY}`, { headers: getHeaders() })
      .then(response => response.json())
      .then(async (res: any) => {
        const classwork = await res.topic;
        dispatch({ type: 'SET_SELECTED_TOPICS', payload: classwork.sort(sortByUpdateDate) });
        localStorage.setItem('selectedTopics', JSON.stringify(classwork));
      })
      .catch((er: any) => { throw new Error(er); });

  } catch (error) {
    console.log(error)
    reportErr('getAllTopics', id, error)
  }
}

/**
 * Returns the list of topics that the requester is permitted to view
 * @param id 
 * @param dispatch 
 */
async function getTopicArray(courseId: string, dispatch: Function) {
  let results: Array<TopicInterface> = [];
  try {
    await fetch(`https://classroom.googleapis.com/v1/courses/${courseId}/topics?&key=${process.env.REACT_APP_API_KEY}`, { headers: getHeaders() })
      .then(response => response.json())
      .then(async (res: any) => results = await res.topic)
      .catch((er: any) => { throw new Error(er); });

  } catch (error) {
    console.log(error)
    reportErr('getTopicArray', courseId, error)
  }
  return results;
}

/**
 * iterates over all the current classrooms and the saved classwork
 * and creates  new classwork in the target classrooms. It sets a hashmap <currentTopicId, targetTopicId>
 * @param classwork
 * @param targetCourseTopicIds
 * @param dispatch
 * @param setLoading
 */
async function createTopics(courseId: string, state: StateInterface, dispatch: Function) {
  const { topics } = state;
  let breaker: boolean = false;
  try {
    for (const topic of topics) {
      if (!breaker) {
        await createTopic(courseId, { ...state, topic }, dispatch); //mock
      }
      breaker = state.error.length > 0;
    }
  } catch (error:any) {
    console.log(error)
    reportErr('createTopics', courseId, error)
  }
}

async function deleteTopic(courseId: string, id: string, state: StateInterface, dispatch: Function) {
  try {
    await fetch(`https://classroom.googleapis.com/v1/courses/${courseId}/topics/${id}?key=${process.env.REACT_APP_API_KEY}`,
      { method: "DELETE", headers: getHeaders() })
      .then(async (res) => {
        if (!res.ok) {
          const er = await res.json();
          throw new Error(er.error.message);
        }
        await Promise.resolve(setTimeout(() => { }, 1000))
        return res.json();
      })
      .then(async (res: any) => {
        // dispatch({ type: 'SET_LOGS', payload: [{ type: logTypes.ASSIGMENT, id: res.id }, ...logs] });
      })
      .catch((er: any) => { throw new Error(er); });
    // dispatch({ type: 'SET_LOADING', payload: "" });
  } catch (error) {
    console.log(error)
    reportErr('deleteTopic', courseId, error)
    // dispatch({ type: 'SET_LOADING', payload: "" });
  }
}
export { createTopics, getAllTopics, deleteTopic, getTopicArray }
