// src/service/request/index.ts
import type { RequestConfig, RequestInterceptors, RequestMethod } from "./type";

/**
 * HTTP请求类
 * 支持三层拦截器:
 * 1. 全局拦截器 (所有实例共享)
 * 2. 实例拦截器 (创建实例时配置)
 * 3. 单次请求拦截器 (请求时配置)
 */
class Request {
  // 实例配置
  private baseURL: string;
  private timeout: number;
  private interceptors?: RequestInterceptors;

  constructor(config: RequestConfig) {
    this.baseURL = config.url || "";
    this.timeout = config.timeout || 10000;
    this.interceptors = config.interceptors;
  }

  /**
   * 发送请求
   * @param config 请求配置
   * @returns Promise
   */
  request<T = any>(config: RequestConfig<T>): Promise<T> {
    // 合并默认配置
    let fullConfig: RequestConfig = {
      ...config,
      timeout: config.timeout || this.timeout,
      header: { ...config.header },
    };

    // 1. 应用单次请求拦截器
    if (config.interceptors?.requestSuccessFn) {
      fullConfig = config.interceptors.requestSuccessFn(fullConfig);
    }

    // 2. 应用实例请求拦截器
    if (this.interceptors?.requestSuccessFn) {
      fullConfig = this.interceptors.requestSuccessFn(fullConfig);
    }

    // 3. 发送请求(全局拦截器由uni.addInterceptor处理)
    return new Promise<T>((resolve, reject) => {
      uni.request({
        url: fullConfig.url?.startsWith("http")
          ? fullConfig.url
          : this.baseURL + fullConfig.url,
        method: (fullConfig.method || "GET") as RequestMethod,
        data: fullConfig.data,
        header: fullConfig.header,
        timeout: fullConfig.timeout,

        success: (res: any) => {
          let result = res;

          // 1. 应用实例响应拦截器
          if (this.interceptors?.responseSuccessFn) {
            result = this.interceptors.responseSuccessFn(result);
          }

          // 2. 应用单次响应拦截器
          if (config.interceptors?.responseSuccessFn) {
            result = config.interceptors.responseSuccessFn(result);
          }

          // 3. 返回处理后的结果
          resolve(result);
        },

        fail: (err: any) => {
          // 处理失败情况
          if (this.interceptors?.responseFailureFn) {
            err = this.interceptors.responseFailureFn(err);
          }

          if (config.interceptors?.responseFailureFn) {
            err = config.interceptors.responseFailureFn(err);
          }

          reject(err);
        },
      });
    });
  }

  /**
   * GET请求
   * @param url 请求地址
   * @param data 请求参数
   * @param config 其他配置
   */
  get<T = any>(url: string, data?: any, config?: RequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      url,
      method: "GET" as RequestMethod,
      data,
    });
  }

  /**
   * POST请求
   * @param url 请求地址
   * @param data 请求参数
   * @param config 其他配置
   */
  post<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig<T>
  ): Promise<T> {
    return this.request<T>({
      ...config,
      url,
      method: "POST" as RequestMethod,
      data,
    });
  }

  /**
   * PUT请求
   * @param url 请求地址
   * @param data 请求参数
   * @param config 其他配置
   */
  put<T = any>(url: string, data?: any, config?: RequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      url,
      method: "PUT" as RequestMethod,
      data,
    });
  }

  /**
   * DELETE请求
   * @param url 请求地址
   * @param data 请求参数
   * @param config 其他配置
   */
  delete<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig<T>
  ): Promise<T> {
    return this.request<T>({
      ...config,
      url,
      method: "DELETE" as RequestMethod,
      data,
    });
  }
}

export default Request;
