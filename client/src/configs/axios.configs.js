import axios from "axios";

export const axiosAPI = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    common: {
      Authorization: null,
    },
  },
});

const setAuthorizationHeader = (token) => {
  axiosAPI.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : null;
};

export { setAuthorizationHeader };
