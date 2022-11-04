import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const url = "http://localhost:3000";

export const addTime = async (input) => {
  const log = {
    id: uuidv4(),
    taskId: input.taskId,
    projectId: input.projectId,
    user_id: input.userId ? input.userId : null,
    duration: input.formattedDuration,
    startDate: input.startDate,
    stopDate: input.stopDate,
  };

  const { data } = await axios.post(`${url}/timelogs`, log);
  return data;
};

export const getTimesByUser = async (userID) => {
  const { data } = await axios.get(
    `${"http://localhost:3000"}/timelogs?user_id=${userID}`
  );
  return data;
};

export const getTimes = async () => {
  const { data } = await axios.get(`${url}/timelogs`);
  return data;
};

export const deleteTime = async (id) => {
  const { data } = await axios.delete(`${url}/timelogs/${id}`);
  return data;
};

export const getTime = async (id) => {
  const { data } = await axios.get(`${url}/timelogs/${id}`);
  return data;
};
