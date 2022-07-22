import axiosService from './axiosService';
import { API_ENDPOINT, QUERY_TYPE } from './constants';
import qs from 'query-string';

export const getDetail = url => {
  return axiosService.get(`${API_ENDPOINT}/${url}`);
};
export const get = (url, params = {}, body = {}, extraHeaders ={}) => {
  let queryParams = '';
  if (Object.keys(params).length > 0) {
    queryParams = `?${qs.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT}/${url}${queryParams}`, body, extraHeaders);
};
export const getFile = (url, params = {}, body = {}, extraHeaders ={}) => {
  let queryParams = '';
  if (Object.keys(params).length > 0) {
    queryParams = `?${qs.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT}/${url}${queryParams}`, body, extraHeaders);
};
export const login = (url, params = {}) => {
  return axiosService.post(`${API_ENDPOINT}/${url}`, params);
};
export const post = (url, params = {}, body = {}, extraHeaders={}) => {
  let queryParams = '';
  if (Object.keys(params).length > 0) {
    queryParams = `?${qs.stringify(params)}`;
  }
  return axiosService.post(`${API_ENDPOINT}/${url}${queryParams}`, body, extraHeaders);
};
export const postPagination = (url, current , pageSize, filter=null, expand={}) => {
  let dataValue= {};
  if (current && pageSize){
    dataValue= {
      $skip: (current-1)*pageSize,
      $top: pageSize
    }
  }
  let data= '$count=true&';
  for (let item in dataValue){
    data += `${item}=${dataValue[item]}&`;
  }
  for (let item in expand){
    data += `expand=${item}(`;
    for (let subitem in expand[item]){
      data += `${subitem}=${expand[item][subitem]}&`;
    }
    data=data.slice(0, -1)+')&'
  }
  if (filter){
    data+=`$filter=${filter}`
  }
  
  console.log(data);
  return axiosService.postPagination(`${API_ENDPOINT}/${url}/$query`, data);
};
export const put = (url, params = {}, body = {}) => {
  let queryParams = '';
  if (Object.keys(params).length > 0) {
    queryParams = `?${qs.stringify(params)}`;
  }
  return axiosService.put(`${API_ENDPOINT}/${url}${queryParams}`, body);
};

export const del = (url, params = {}, body = {}) => {
  let queryParams = '';
  if (Object.keys(params).length > 0) {
    queryParams = `?${qs.stringify(params)}`;
  }
  return axiosService.delete(`${API_ENDPOINT}/${url}${queryParams}`, body);
};
