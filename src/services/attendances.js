import axios from "axios";
const baseUrl = "http://localhost:5000/api";

let token = null;

// set token
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

// delete one attendance
const deleteOne = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(baseUrl + "/attendances/" + id, config);
  return request.then((response) => response.data);
};

// update one attendance
const updateAttendance = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.put(baseUrl + "/attendances/" + id, newObject, config);
  console.log(config);
  return request.then((response) => response.data);
};

// export all functions
export default { setToken, deleteOne, updateAttendance };
