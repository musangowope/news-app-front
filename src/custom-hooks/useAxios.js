import React from "react";
import axios from "axios";
import { hasValue } from "../utility-functions/hasValue.func";

const baseRequestState = {
  loading: false,
  failed: false,
  success: false,
  response: {},
  errorData: null,
};

export default function useAxios(
  url = "",
  method = "get",
  config = null,
  postData = null,
  loadingToSuccessDuration = 0
) {
  const [request, setRequestState] = React.useState(baseRequestState);
  const updateRequest = (obj = {}) =>
    setRequestState({
      ...baseRequestState,
      ...obj,
    });

  React.useEffect(() => {
    const getRestArgs = () => {
      switch (method) {
        case "get":
        case "delete":
          return [config];
        case "post":
        case "put":
          return [postData, config];
        default:
          return [];
      }
    };

    if (hasValue(url)) {
      updateRequest({
        loading: true,
      });
      const restArgs = getRestArgs();
      axios[method](url, ...restArgs)
        .then((res) => {
          window.setTimeout(() => {
            updateRequest({
              success: true,
              response: res.data,
            });
          }, loadingToSuccessDuration);
        })
        .catch((e) => {
          updateRequest({
            failed: true,
            errorData: e,
          });
        });
    }
  }, [loadingToSuccessDuration, method, postData, url]);

  return request;
}
