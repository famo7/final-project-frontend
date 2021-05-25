import axios from "axios";
const baseUrl = "https://empmanagementsystem.herokuapp.com/api";

let token = null;

// set token
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

// get all employees
const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.get(baseUrl + "/employees", config);
  return request.then((response) => response.data);
};

// create new employee
const createEmp = (emp) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.post(baseUrl + "/employees", emp, config);
  return request.then((response) => response.data);
};

// export all function
export default { setToken, getAll, createEmp };
