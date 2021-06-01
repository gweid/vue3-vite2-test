import Axios, { AxiosInstance } from 'axios';
import Qs from 'qs';
import { jsonSort } from './tools';

const defaultConfig = {
  baseURL: 'http://127.0.0.1:9000',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
};

type IDefaultConfig = typeof defaultConfig

class Request {
  config: IDefaultConfig

  constructor(config: IDefaultConfig) {
    this.config = config;
  }

  request() {
    const option = {
      transformRequest: (data: any) => {
        // transformRequest 方法只适用 post put等，对 get 请求没用，需要做处理
        if (data === undefined || data === null) return;
        // 合并参数

        const arr = [];
        for (const key in data) {
          arr.push(`${key}=${data[key]}`);
        }
        const str = arr.sort().join('&');
        data = Object.assign(data, {
          sign: str,
        });

        return Qs.stringify(data);
      },
    };

    // 创建一个 axios 实例
    const axios = Axios.create(Object.assign(this.config, option));

    this.reqIntercept(axios); // 请求拦截
    this.resIntercept(axios); // 响应拦截

    return axios;
  }

  // 请求拦截
  reqIntercept(axios: AxiosInstance) {
    // 请求拦截
    axios.interceptors.request.use(
      (config) => {
        console.log('===========================请求参数======================');
        console.log(config);
        return config;
      },
      (error) => {
        console.error(error.message);
        return Promise.reject(error);
      },
    );
  }

  // 响应拦截
  resIntercept(axios: AxiosInstance) {
    // 响应拦截
    axios.interceptors.response.use(
      (result) => {
        console.log('===========================响应结果======================');
        console.log(result.data);

        if (result.data.code == 0) {
          return result.data;
        }
        throw result.data;
      },
      (error) => {
        if (error && error.response.status) {
          switch (error.response.status) {
            case 401:
              error.message = '未授权，请登录';
              /* 跳转登录页 */
              // window.location.replace(location.origin + '/user/login');
              break;
            default:
              error.message = '请求失败';
          }
        }
        return Promise.reject(error);
      },
    );
  }

  // get 请求
  get(url: string, body = {}) {
    if (Object.keys(body).length > 0) {
      return this.request().get(`${url}?${jsonSort(body)}`);
    }
    return this.request().get(url);
  }

  // post 请求
  post(url: string, body: any) {
    return this.request().post(url, body);
  }
}

export default new Request(defaultConfig);
