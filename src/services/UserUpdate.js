import axios from "axios";
const baseUrl = "http://localhost:5000/api/employees";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.put(`${baseUrl}/${id}`, newObject, config);
  console.log(config);
  return request.then((response) => response.data);
};

export default { update, setToken };
