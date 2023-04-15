import axios from "axios";
import AuthOperations from "redux/auth/AuthOperations";

let store;
export const injectStore = (_store) => {
  store = _store;
};

const API = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL,
});

API.interceptors.request.use((config) => {
  const accessToken = store.getState().auth.accessToken;
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

API.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await store.dispatch(AuthOperations.refresh());
        return API.request(originalRequest);
      } catch (err) {
        return Promise.reject(err.message);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
