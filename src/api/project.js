import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const url = "http://localhost:3000";

export const addProject = async (input, userID) => {
  const project = {
    id: uuidv4(),
    user_id: userID ? userID : null,
    name: input.name,
    description: input.description,
    deadline: input.deadline,
    color: input.color,
    isDone: false,
  };
  const { data } = await axios.post(`${url}/projects`, project);
  return data;
};

export const getProjectsByUser = async (userID) => {
  const { data } = await axios.get(
    `${"http://localhost:3000"}/projects?user_id=${userID}`
  );
  return data;
};

export const editProject = async (id, input) => {
  const { data } = await axios.put(`${url}/projects/${id}`, input);
  return data;
};

export const deleteProject = async (id) => {
  const { data } = await axios.delete(`${url}/projects/${id}`);
  return data;
};

export const completeProject = async (id, status) => {
  const updateStatus = { isDone: status };
  const { data } = await axios.patch(`${url}/projects/${id}`, updateStatus);
  return data;
};

export const getProjects = async () => {
  const { data } = await axios.get(`${url}/projects`);
  return data;
};

export const getProject = async (id) => {
  const { data } = await axios.get(`${url}/projects/${id}`);
  return data;
};

// Try catch?
// Hur hantera error?
//   if (!response.ok) {
//     const message = `An error has occured: ${response.status}`;
//     throw new Error(message);
//   }
