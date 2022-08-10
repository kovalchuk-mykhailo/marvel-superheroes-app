import axios, { AxiosInstance, AxiosResponse, Method } from 'axios';
import { EAPI } from '../types/Api';

export const getAxiosInstance = (api: EAPI): AxiosInstance => {
  return axios.create({
    baseURL: api
  });
};

export const axiosRequest = <T>(
  apiInstance: AxiosInstance,
  method: Method,
  url: string,
  params: any
): Promise<AxiosResponse<T>> => {
  return apiInstance.request<T>({
    method,
    url,
    params
  });
};
