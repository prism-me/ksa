import axios from "axios";
import { constants } from "../utils/constants";
import { store } from "./../store";

const apiURL = constants.staging_url;
export const API = axios.create({
  baseURL: apiURL,
  timeout: 60000,
});

API.interceptors.request.use(
  (request) => {
    if (request) {
      if (
        request.url != "/all_widgets/60afb414873ead1356428ec2" &&
        request.url != "/all_widgets/60afdb7be1666745600ebff2" &&
        request.url != "/all_widgets/60affc91d79f7f058906b5f2" &&
        request.url != "/pages" &&
        request.url != "/emirates" &&
        request.url != "/categories" &&
        request.url != "/register" &&
        request.url != "/filteredProduct/null/null/Recommended?page=all" &&
        request.url != "/product_list/null/null/Recommended?page=all" &&
        request.url.startsWith("/product_list/")
      ) {
        store.dispatch({
          type: "SHOW_SPINNER",
        });
      }
      if (request.url.startsWith("/auth/filteredProduct")) {
        // store.dispatch({ type: "SHOW_SPINNER" });
        store.dispatch({
          type: "EMPTY_PRODUCTS",
        });
      }
      //perform the manipulation here and change the request object
      // alert("request called")
    }
    return {
      ...request,
      onUploadProgress: function (progressEvent) {
        console.log(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
      },
    };
  },
  (error) => {
    console.log("interceptor request ERROR", error);
    store.dispatch({ type: "HIDE_SPINNER" });

    return Promise.reject(error.message);
  }
);

API.interceptors.response.use(
  (response) => {
    store.dispatch({ type: "HIDE_SPINNER" });

    if (response) {
      //perform the manipulation here and change the response object
    }
    return response;
  },
  (error) => {
    console.log("interceptor response ERROR", error);

    store.dispatch({ type: "HIDE_SPINNER" });

    if (error.response?.status === 401) {
      // history.replace("/authentication/logout");
    }
    return Promise.reject(error.message);
  }
);
