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
  console.log(baseUrl + "/tasks");
  return request.then((response) => response.data);
};

export default { getAll, setToken };
