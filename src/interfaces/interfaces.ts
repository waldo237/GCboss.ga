enum logTypes {
    COURSE,
    TOPIC,
    ASSIGMENT,
    MATERIAL,
    DELETE,
}
enum state {
    COURSE_WORK_STATE_UNSPECIFIED,
    PUBLISHED,
    DRAFT,
    DELETED,
}

enum assigneeMode {
    ASSIGNEE_MODE_UNSPECIFIED,
    ALL_STUDENTS,
    INDIVIDUAL_STUDENTS
}
enum shareMode {
    UNKNOWN_SHARE_MODE,
    VIEW,
    EDIT,
    STUDENT_COPY
}
enum workType {
    COURSE_WORK_TYPE_UNSPECIFIED,
    ASSIGNMENT,
    SHORT_ANSWER_QUESTION,
    MULTIPLE_CHOICE_QUESTION
}
enum submissionModificationMode {
    SUBMISSION_MODIFICATION_MODE_UNSPECIFIED,
    MODIFIABLE_UNTIL_TURNED_IN,
    MODIFIABLE
}
interface UserInterface {
    emailAddress: string,
    displayName: string,
    permissionId: string,
    photoLink: string,
}
interface AssignmentInterface {
    assigneeMode: assigneeMode,
    creatorUserId?: string,
    title: string,
    description: string,
    state: state,
    updateTime: string,
    alternateLink: string,
    courseId?: string,
    id?: string,
    creationTime: string,
    individualStudentsOptions: {
        studentIds: [
            string
        ]
    },
    topicId?: string
    materials: [
        {
            driveFile: {
                driveFile:
                {
                    id: string,
                    title: string
                },
                shareMode: shareMode
            },
            form: {
                formUrl: string,
                responseUrl: string,
                thumbnailUrl: string,
                title: string
            },
            link: {
                thumbnailUrl: string,
                title: string,
                url: string
            },
            youtubeVideo: {
                alternateLink: string,
                id: string,
                thumbnailUrl: string,
                title: string
            }
        }], scheduledTime: string,
    workType: workType,
    associatedWithDeveloper: boolean,
    maxPoints: number,
    submissionModificationMode: submissionModificationMode,
    assignment: {
        studentWorkFolder: {
            alternateLink: string,
            id: string,
            title: string
        }
    },
    multipleChoiceQuestion: {
        choices: [string]
    },
    dueDate: {
        day: number,
        month: number,
        year: number
    },
    dueTime: {
        hours: number,
        minutes: number,
        nanos: number,
        seconds: number
    }
}

interface CourseInterface{
    
    id: string,
    name: string,
    section: string,
    descriptionHeading: string,
    description: string,
    room: string,
    ownerId: string,
    creationTime: string,
    updateTime: string,
    enrollmentCode: string,
    alternateLink: string,
    teacherGroupEmail: string,
    courseGroupEmail: string,
    guardiansEnabled: boolean,
    calendarId: string,
    courseState:string,
    user:{emailAddress:string},
    dateItWasSaved:number|Date,

  
}


interface TopicInterface {
    courseId: string,
    topicId: string,
    name: string,
    updateTime: Date
}
interface TopicIdsInterface {
    [key: string]: string;
    courseId: string,
    // name: string,
    topicId: string,
    updateTime: string
}

interface ErrorInterface{
    message:string,
    date: Date
}

interface StateInterface {
    assignments: [AssignmentInterface],
    assignment: AssignmentInterface,
    error: [ErrorInterface], 
    topics: [TopicIdsInterface],
    topic: TopicIdsInterface,
    targetCourseTopicIds: TopicIdsInterface,
    logs: [{ type: logTypes, id: string }]
}


export type { AssignmentInterface, TopicIdsInterface, TopicInterface, UserInterface, StateInterface, CourseInterface };
export { logTypes }