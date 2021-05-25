import axios from "axios";
const baseUrl = "/api/employees";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

// set authorization
const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  // send put request to update profile
  const request = axios.put(`${baseUrl}/${id}`, newObject, config);

  return request.then((response) => response.data);
};

// export funtions needed
export default { update, setToken };
