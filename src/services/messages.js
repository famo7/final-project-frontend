import axios from "axios";
const baseUrl = "http://localhost:5000/api";

let token = null;

// set token
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

// get all messages
const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.get(baseUrl + "/messages", config);
  return request.then((response) => response.data);
};

// delete message inbox
const deleteOne = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(baseUrl + "/messages/" + id, config);
  return request.then((response) => response.data);
};

// send message
const sendMessage = (msg) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.post(baseUrl + "/messages", msg, config);
  return request.then((response) => response.data);
};

// export all functions
export default { getAll, setToken, deleteOne, sendMessage };
