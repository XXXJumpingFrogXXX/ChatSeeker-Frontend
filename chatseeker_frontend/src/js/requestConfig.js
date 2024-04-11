import axios from "axios";

const requestConfig = {
    config: {
        headers: {
            'Content-type': 'multipart/form-data',
            accept: 'application/json'
        }
    },
    // for Production server
    baseURL: 'http://127.0.0.1/chat-seeker-backend',
    // Normal Setting
    basePath: '/',
}

const request = function (
  method,
  url,
  params,
  data,
  contentType = "application/json"
) {
  axios.interceptors.response.use(
    (response) => {
    //   if (response.data.success === false) {
    //     const $toast = useToast();
    //     $toast({
    //       position: "top",
    //       message: response.data.response,
    //     });
    //   }
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return axios.request({
    method: method,
    url: requestConfig.baseURL + url,
    params: params,
    data: data,
    headers: {
      "Content-type": contentType,
      accept: "application/json",
    },
  });
};
export { requestConfig, request };
