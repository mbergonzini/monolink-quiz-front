import {
  ApiError,
  ApiErrorDetails,
  ErrorDetails,
  ErrorDetailsField,
} from "../../model/error";

/* eslint-disable @typescript-eslint/no-explicit-any */
const fetcher = <ResponseType>(url: string, method: string, body: any): Promise<ResponseType> => {
  const headers = {
   Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json"
  };

 return fetch(url, {
    headers: headers,
    method,
    credentials: "include",
    body: body ? JSON.stringify(body) : null
  }).then((response) => {
    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("image/jpeg") !== -1) {
        return response.blob();
      }
      return response.json();
    } else {
      return resolveErrors(response);
    }
  });
};

const fetcherFile = <ResponseType>(url: string, method: string, body: any): Promise<ResponseType> => {

 return fetch(url, {
    method,
    credentials: "include",
    body: body
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return resolveErrors(response);
    }
  });
};

const resolveErrors = async (response: Response) => {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") == -1) {
    return new ApiError(response.status, response.url, await response.text());
  }

  return response.json().then((errObject) => {
    switch (errObject.code) {
      case 400: {
        const errObjectDetails = errObject as ErrorDetails<ErrorDetailsField[]>;
        return new ApiErrorDetails<ErrorDetailsField[]>(
          errObjectDetails.code,
          errObjectDetails.path,
          errObjectDetails.message,
          errObjectDetails.details
        );
      }
      default:
        return new ApiError(errObject.code, errObject.path, errObject.message);
    }
  });
};

export { fetcher, fetcherFile };