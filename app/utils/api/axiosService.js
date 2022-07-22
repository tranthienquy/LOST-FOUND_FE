import axios from 'axios';
import { message } from 'antd';

class AxiosService {
  constructor() {
    const instance = axios.create();
    instance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.instance = instance;
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    if (error.message==="Network Error")
    {
      message.destroy();
      message.error('There is an error network occured');
    }
   
    if(error.status==401){
       localStorage.setItem('token','');
       location.reload();

    }
    return (error.response || error);
  }

  get(uri, body, extraHeaders,) {
    const authorization = localStorage.getItem('token');
    console.log(extraHeaders);
    let headers={
      ...extraHeaders
    };
    if (authorization){
      headers.Authorization =  `Bearer ${authorization}`; 
    }
    return this.instance.get(
      uri,
      {
        headers,
      },
      body,
    ).catch(error =>{
      console.log(error)
    });
  }

  getFile(uri, body, extraHeaders,) {
    const authorization = localStorage.getItem('token');
    console.log(extraHeaders);
    let headers={
      ...extraHeaders
    };
    if (authorization){
      headers.Authorization =  `Bearer ${authorization}`; 
    }
    return this.instance.get(
      uri,
      {
        headers,
        responseType: 'blob'
      },
      body,
    ).catch(error =>{
      console.log(error)
    });
  }

  postPagination(uri, data){
    const authorization = localStorage.getItem('token');
    let headers={
      'Content-Type': 'text/plain',
    };
    if (authorization){
      headers.Authorization =  `Bearer ${authorization}`; 
    }
    return this.instance.post(
      uri,data,
      {
        headers,
        
      },
    ).catch(error =>{
      console.log(error)
    });
  }

  post(url, body,extraHeaders) {
    const authorization = localStorage.getItem('token');
    let headers={
    //  "content-type": "application/json"
      ...extraHeaders
    };
    if (authorization){
      headers.Authorization =  `Bearer ${authorization}`; 
    }
    return this.instance.post(url, body, {
      headers,
    });
  }

  put(url, body, extraHeaders) {
    const authorization = localStorage.getItem('token');
    let headers={
      ...extraHeaders
    };
    if (authorization){
      headers.Authorization =  `Bearer ${authorization}`; 
    }
    return this.instance.put(url, body, {
      headers
    });
  }
  delete(url) {
    const authorization = localStorage.getItem('token');
    let headers={
    //  "content-type": "application/json"
    };
    if (authorization){
      headers.Authorization =  `Bearer ${authorization}`; 
    }
    return this.instance.delete(url, {
      headers
    });
  }

}
export default new AxiosService();
