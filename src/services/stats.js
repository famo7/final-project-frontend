import axios from "axios";
// set base url
const baseUrl = "https://empmanagementsystem.herokuapp.com/api";

let token = null;

// set token
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

// get all stats

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.get(baseUrl + "/stats", config);
  return request.then((response) => response.data);
};

export default {
  getAll,
  setToken,
};
