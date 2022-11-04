import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const url = "http://localhost:3000";

export const addUser = async (input) => {
  const user = {
    id: uuidv4(),
    username: input.username,
  };
  const { data } = await axios.post(`${url}/users`, user);
  return data;
};

export const editUser = async (id, input) => {
  const { data } = await axios.put(`${url}/users/${id}`, input);
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await axios.delete(`${url}/users/${id}`);
  return data;
};

export const completeUser = async (id, status) => {
  const updateStatus = { isDone: status };
  const { data } = await axios.patch(`${url}/users/${id}`, updateStatus);
  return data;
};

export const getUsers = async () => {
  const { data } = await axios.get(`${url}/users`);

  return data;
};

export const getUser = async (id) => {
  const { data } = await axios.get(`${url}/users/${id}`);
  return data;
};

// Try catch?
// Hur hantera error?
//   if (!response.ok) {
//     const message = `An error has occured: ${response.status}`;
//     throw new Error(message);
//   }
