// src/service/index.ts
import { BASE_URL, TIME_OUT } from "./config";
import Request from "./request";

// 注册全局拦截器
uni.addInterceptor("request", {
  invoke(options) {
    // 显示加载中
    uni.showLoading({ title: "加载中" });
  },
  success(res) {
    // 这里不需要做什么，返回原始结果
    return res;
  },
  fail(err) {
    // 统一错误提示
    uni.showToast({
      title: "请求失败，请稍后再试",
      icon: "none",
    });
    return err;
  },
  complete() {
    // 隐藏加载提示
    uni.hideLoading();
  },
});

// 创建请求实例
const myRequest = new Request({
  url: BASE_URL,
  timeout: TIME_OUT,
  // // 实例级拦截器
  // interceptors: {
  //   requestSuccessFn: (config) => {
  //     // 自动携带token
  //     const token = getCache(TOKEN_KEY);
  //     if (token && config.header) {
  //       config.header.Authorization = `Bearer ${token}`;
  //     }
  //     return config;
  //   },
  //   responseSuccessFn: (res) => {
  //     // 只返回data部分
  //     if (res.statusCode === 200) {
  //       return res.data;
  //     }

  //     // 处理错误状态码
  //     if (res.statusCode === 401) {
  //       // token过期，跳转登录页
  //       uni.navigateTo({ url: "/pages/login/index" });
  //     }

  //     return res;
  //   },
  // },
});

export default myRequest;
