import axios from "axios";
const baseUrl = "http://localhost:5000/api";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.get(baseUrl + "/tasks", config);
  return request.then((response) => response.data);
};

const updateTime = (id, obj) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.put(baseUrl + "/times" + "/" + id, obj, config);
  return request.then((response) => response.data);
};
const updateStatus = (id, obj) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.put(baseUrl + "/tasks" + "/" + id, obj, config);
  return request.then((response) => response.data);
};

const deleteTask = (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.delete(baseUrl + "/tasks" + "/" + id, config);
  return request.then((response) => response.data);
};
export default { getAll, setToken, updateTime, updateStatus, deleteTask };
