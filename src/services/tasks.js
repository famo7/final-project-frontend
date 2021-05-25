import axios from "axios";
// set base url
const baseUrl = "https://empmanagementsystem.herokuapp.com/api";

let token = null;

// set token
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

// get all tasks
const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.get(baseUrl + "/tasks", config);
  return request.then((response) => response.data);
};

// update the time for tasks
const updateTime = (id, obj) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.put(baseUrl + "/times" + "/" + id, obj, config);
  return request.then((response) => response.data);
};
// update status for task
const updateStatus = (id, obj) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.put(baseUrl + "/tasks" + "/" + id, obj, config);
  return request.then((response) => response.data);
};

// delete a task
const deleteTask = (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.delete(baseUrl + "/tasks" + "/" + id, config);
  return request.then((response) => response.data);
};

const createTask = (obj) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.post(baseUrl + "/tasks", obj, config);
  return request.then((response) => response.data);
};
// export all functions
export default {
  getAll,
  setToken,
  updateTime,
  updateStatus,
  deleteTask,
  createTask,
};
