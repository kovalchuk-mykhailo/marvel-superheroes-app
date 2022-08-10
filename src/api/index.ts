import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { EAPI, IAxiosParams } from '../types/api';

export const getAxiosInstance = (api: EAPI): AxiosInstance => {
  return axios.create({
    baseURL: api
  });
};

export const axiosRequest = <T>(
  apiInstance: AxiosInstance,
  { method, url, params }: IAxiosParams
): Promise<AxiosResponse<T>> => {
  return apiInstance.request<T>({
    method,
    url,
    params
  });
};
