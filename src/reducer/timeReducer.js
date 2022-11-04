export const initialState = {
  userId: "",
  taskId: "",
  projectId: "",
  startDate: "",
  stopDate: "",
  duration: 0,
  formattedDuration: "00:00:00",
  timerOn: false,
};

export const timeReducer = (state, action) => {
  switch (action.type) {
    case "start":
      return {
        ...state,
        userId: action.userId,
        taskId: action.taskId,
        projectId: action.projectId,
        startDate: action.startDate,
        timerOn: true,
        duration: action.duration,
      };

    case "tick":
      return {
        ...state,
        duration: action.duration,
        formattedDuration: action.formattedDuration,
      };
    case "stop":
      return {
        ...state,
        stopDate: action.stopDate,
        timerOn: false,
      };
    case "backup":
      return {
        backupStartDate: action.startDate,
        formattedDuration: action.formattedDuration,
        timerOn: false,
      };

    case "reset":
      return initialState;

    default:
      return initialState;
  }
};
