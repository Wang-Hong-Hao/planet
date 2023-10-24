import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  CustomParamsSerializer,
} from 'axios'
import { stringify } from 'qs'
import NProgress from 'nprogress'
// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  // 请求超时时间
  timeout: 10000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer,
  },
}
const service = axios.create(defaultConfig) // Request interceptors

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    NProgress.start()
    // do something
    return config
  },
  (error: any) => {
    Promise.reject(error)
  }
) // Response interceptors

interface IResponseType<P = {}> {
  code?: number
  status: number
  msg: string
  data: P
}
service.interceptors.response.use(
  async (response: AxiosResponse): Promise<any> => {
    // do something
    NProgress.done()
  },
  (error: any) => {
    // do something
    return Promise.reject(error)
  }
)

export default service
