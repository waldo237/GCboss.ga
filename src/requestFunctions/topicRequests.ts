import { StateInterface, TopicInterface } from "../interfaces/interfaces";
import { getHeaders } from "../components/signInFuncs";
import { reportErr, sortByUpdateDate } from "./util";
import { emitExceededQuota } from "./emitExceededQuota";

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
async function createTopic(
  courseId: string,
  state: StateInterface,
  dispatch: Function
) {
  const { topic } = state;
  const requestBody: BodyInit = JSON.stringify(topic);
  try {
    await fetch(
      `https://classroom.googleapis.com/v1/courses/${courseId}/topics?key=${process.env.REACT_APP_API_KEY}`,
      { method: "POST", headers: getHeaders(), body: requestBody }
    )
      .then(async (res) => {
        await emitExceededQuota(res);
        return res.json();
      })
      .catch((er: any) => {
        throw new Error(er);
      });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * dispatches the list of topics that the requester is permitted to view.
 * @param id
 * @param dispatch
 */
async function getAllTopics(id: string, dispatch: Function) {
  dispatch({ type: "SET_SELECTED_TOPICS", payload: null });
  try {
    await fetch(
      `https://classroom.googleapis.com/v1/courses/${id}/topics?&key=${process.env.REACT_APP_API_KEY}`,
      { headers: getHeaders() }
    )
      .then((response) => response.json())
      .then(async (res: any) => {
        const classwork = await res.topic;
        dispatch({
          type: "SET_SELECTED_TOPICS",
          payload: classwork.sort(sortByUpdateDate),
        });
        localStorage.setItem("selectedTopics", JSON.stringify(classwork));
      })
      .catch((er: any) => {
        throw new Error(er);
      });
  } catch (error) {
    console.log(error);
    reportErr("getAllTopics", id, error);
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
    await fetch(
      `https://classroom.googleapis.com/v1/courses/${courseId}/topics?&key=${process.env.REACT_APP_API_KEY}`,
      { headers: getHeaders() }
    )
      .then((response) => response.json())
      .then(async (res: any) => (results = await res.topic))
      .catch((er: any) => {
        throw new Error(er);
      });
  } catch (error) {
    console.log(error);
    reportErr("getTopicArray", courseId, error);
  }

  return results;
}

/**
 * Loads topics from the model in the state. It sends requests
 * to create those topics in the target course.
 * @param courseId
 * @param state
 * @param dispatch
 */
async function createTopics(
  courseId: string,
  state: StateInterface,
  dispatch: Function
) {
  const { topics } = state;
  for (const topic of topics) {
    try {
      await createTopic(courseId, { ...state, topic }, dispatch); //mock
    } catch (error) {
      reportErr("createTopics", courseId, error);
    }
  }
}

async function deleteTopic(
  courseId: string,
  id: string,
  state: StateInterface,
  dispatch: Function
) {
  try {
    await fetch(
      `https://classroom.googleapis.com/v1/courses/${courseId}/topics/${id}?key=${process.env.REACT_APP_API_KEY}`,
      { method: "DELETE", headers: getHeaders() }
    )
      .then(async (res) => {
        await emitExceededQuota(res);
        return res.json();
      })
      .catch((er: any) => {
        throw new Error(er);
      });
  } catch (error) {
    reportErr("deleteTopic", courseId, error);
  }
}
export { createTopics, getAllTopics, deleteTopic, getTopicArray };
