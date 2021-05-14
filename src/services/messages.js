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

  const request = axios.get(baseUrl + "/messages", config);
  return request.then((response) => response.data);
};

const deleteOne = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(baseUrl + "/messages/" + id, config);
  return request.then((response) => response.data);
};

const sendMessage = (msg) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.post(baseUrl + "/messages", msg, config);
  return request.then((response) => response.data);
};

export default { getAll, setToken, deleteOne, sendMessage };
