import {fetcher, fetcherFile}  from './fetcher';

export const getRequest = <ResponseType>(url: string) =>
   fetcher<ResponseType>(`${url}`, 'GET', null);

export const postRequest = <ResponseType>(url: string, body: unknown) =>
  fetcher<ResponseType>(`${url}`, 'POST', body);

export const postRequestFile = <ResponseType>(url: string, body: FormData) =>
  fetcherFile<ResponseType>(`${url}`, 'POST', body);  

export const putRequest = <ResponseType>(url: string, body: unknown) => fetcher<ResponseType>(`${url}`, 'PUT', body);

export const deleteRequest = <ResponseType>(url: string) => fetcher<ResponseType>(`${url}`, 'DELETE', null);