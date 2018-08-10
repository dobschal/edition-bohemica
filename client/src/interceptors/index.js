import { HTTP } from "../util";

/**
 *  We can add request/response interceptors here. I.e. to 
 *  replace the locally stored auth token.
 */

HTTP().interceptors.response.use(response => {
    console.log("[interceptor] Intercepted the response!");
    return response;
}, error => {
    console.log("[intercetpor] Intercepted an error response.");
    return Promise.reject(error);
});