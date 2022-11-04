import { useEffect } from "react";
import { createContext, useState } from "react";
import * as api_pr from "../api/project";
import * as api_ta from "../api/task";
import * as api_ti from "../api/time";

import { mergeTasksTimeSessions } from "../utils/merge-task-time";

export const CollectionContext = createContext();

export const CollectionProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [times, setTimes] = useState([]);
  const [taskTimes, setTaskTimes] = useState([]);

  const [loggedUser, setLoggedUser] = useState(() => {
    const localData = localStorage.getItem("userData");
    return localData
      ? JSON.parse(localData)
      : { username: "anonymous", id: "anonymous" };
  });

  useEffect(() => {
    getProjects(loggedUser.id);
    getTasks(loggedUser.id);
    getTimes(loggedUser.id);
  }, [loggedUser.id]);

  useEffect(() => {
    getTaskTimes();
  }, [tasks, times]);

  const getTaskTimes = () => {
    const merged = mergeTasksTimeSessions(tasks, times);
    setTaskTimes(merged);
  };

  const getProjects = async (userID) => {
    const fetchedProjects = await api_pr.getProjectsByUser(userID);
    setProjects(fetchedProjects);
  };

  const getTasks = async (userID) => {
    const fetchedTasks = await api_ta.getTasksByUser(userID);
    setTasks(fetchedTasks);
  };

  const getTimes = async (userID) => {
    const fetchedTimes = await api_ti.getTimesByUser(userID);
    setTimes(fetchedTimes);
  };

  const providerValue = {
    tasks,
    getTasks,
    projects,
    getProjects,
    times,
    getTimes,
    taskTimes,
    getTaskTimes,
    loggedUser,
    setLoggedUser,
  };

  return (
    <CollectionContext.Provider value={providerValue}>
      {children}
    </CollectionContext.Provider>
  );
};
