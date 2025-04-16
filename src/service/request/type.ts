// src/service/request/types.ts
export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

/**
 * 请求拦截器接口
 */
export interface RequestInterceptors<T = any> {
  // 请求拦截
  requestSuccessFn?: (config: RequestConfig) => RequestConfig;
  requestFailureFn?: (err: any) => any;

  // 响应拦截
  responseSuccessFn?: (res: T) => T;
  responseFailureFn?: (err: any) => any;
}

/**
 * 请求配置接口
 */
export interface RequestConfig<T = any> {
  url?: string;
  method?: RequestMethod;
  data?: any;
  header?: Record<string, any>;
  timeout?: number;
  interceptors?: RequestInterceptors<T>; // 单次请求拦截器
}
