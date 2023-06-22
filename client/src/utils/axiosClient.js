import axios from "axios";

import store from "../redux/store";
import { TOAST_FAILURE } from "../App";
import { setLoading, showToast } from "../redux/slices/appConfigSlice";
import {
  getItem,
  KEY_ACCESS_TOKEN,
  removeItem,
  setItem,
} from "./localStorageManger";

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  withCredentials: true,
});

// !!!!!!!!!!!warning
// this file is not component so we cant dispatch from here so to dispatch we have to import store from redux

axiosClient.interceptors.request.use((request) => {
  const accesstoken = getItem(KEY_ACCESS_TOKEN);

  request.headers["Authorization"] = `Bearer ${accesstoken}`;

  store.dispatch(setLoading(true));

  return request;
});

axiosClient.interceptors.response.use(
  async (response) => {
    store.dispatch(setLoading(false));


    const data = response.data;
    if (data.status === "ok") {
      return data;
    }

    const originalRequest = response.config;
    const statusCode = data.statusCode;
    const error = data.message;

    store.dispatch(
      showToast({
        type: TOAST_FAILURE,
        message: error,
      })
    );

    // supose 401 throw due to other reason i mean if rf token expiry then above loop trap them but here case is other reason(401) then  mean other api call  then we gen other  accces key silently  means  silenetly call access token api  call

    // if throw 401 hence acces token expired
    if (statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // const response = await axios.create("/auth/refresh");
      const response = await axios
        .create({
          withCredentials: true,
        })
        .get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);

      console.log("response from backend", response);

      if (response.status === "ok") {
        // here update request with authorization
        setItem(KEY_ACCESS_TOKEN, response.result.accesstoken);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.result.accesstoken}`;

        return axios(originalRequest);
      } else {
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace("/login", "_self");

        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
  // this is error network problem system problem
  async (error) => {
    store.dispatch(setLoading(false));


    store.dispatch({
      type: TOAST_FAILURE,
      message: error.message,
    });
    return Promise.reject(error);

  }
);

// before request going we intercept request in this way where we intercept the request like this way 1)bearer+${accestoken}
