import axios from "axios";
const baseUrl = "http://localhost:5000/api";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const deleteOne = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(baseUrl + "/attendances/" + id, config);
  return request.then((response) => response.data);
};

const updateAttendance = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.put(baseUrl + "/attendances/" + id, newObject, config);
  console.log(config);
  return request.then((response) => response.data);
};

export default { setToken, deleteOne, updateAttendance };
