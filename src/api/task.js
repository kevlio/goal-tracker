import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const url = "http://localhost:3000";

export const addTask = async (input, userID) => {
  const task = {
    id: uuidv4(),
    name: input.name,
    user_id: userID ? userID : null,
    projectId: input.projectId,
    deadline: input.deadline,
    color: input.color,
    isDone: false,
  };
  const { data } = await axios.post(`${url}/tasks`, task);
  return data;
};

export const getTasksByUser = async (userID) => {
  const { data } = await axios.get(
    `${"http://localhost:3000"}/tasks?user_id=${userID}`
  );
  return data;
};

export const editTask = async (id, input) => {
  const { data } = await axios.put(`${url}/tasks/${id}`, input);
  return data;
};

export const deleteTask = async (id) => {
  const { data } = await axios.delete(`${url}/tasks/${id}`);
  return data;
};

export const completeTask = async (id, status) => {
  const updateStatus = { isDone: status };
  const { data } = await axios.patch(`${url}/tasks/${id}`, updateStatus);
  return data;
};

export const getTasks = async () => {
  const { data } = await axios.get(`${url}/tasks`);
  return data;
};

export const getTask = async (id) => {
  const { data } = await axios.get(`${url}/tasks/${id}`);
  return data;
};
