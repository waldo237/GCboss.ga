const Reducer = (state:any, action:{type:string, payload:any}) => {
    switch (action.type) {
        case 'SET_PROFILE':
            return {
                ...state,
                profile: action.payload
            };
        case 'SET_IS_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: action.payload
            };
        case 'SET_PROFILE_DASHBOARD':
            return {
                ...state,
                profileDashboard: action.payload
            };
        case 'SET_SELECTED_CLASSROOM':
            return {
                ...state,
                selectedClassroom: action.payload
            };

        case 'SET_COURSES':
            return {
                ...state,
                courses: action.payload
            };
        case 'SET_SELECTED_ASSIGNMENTS':
            return {
                ...state,
                assignments: action.payload
            };
        case 'SET_SELECTED_TOPICS':
            return {
                ...state,
                topics: action.payload
            };
        case 'SET_COURSE_ID':
            return {
                ...state,
                courseId: action.payload 
            };
        case 'SET_TARGET_TOPIC_IDS':
            return {
                ...state,
                targetCourseTopicIds: action.payload 
            };
        case 'SET_ERROR':
            return {
                ...state,
                error:  action.payload
            };
        case 'SET_LOGS':
            return {
                ...state,
                logs:  action.payload
            };

        default:
            return state;
    }
};

export default Reducer;