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

  const request = axios.get(baseUrl + "/employees", config);
  return request.then((response) => response.data);
};
const createEmp = (emp) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.post(baseUrl + "/employees", emp, config);
  return request.then((response) => response.data);
};

export default { setToken, getAll, createEmp };
