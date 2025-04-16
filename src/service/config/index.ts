// 1.区分开发环境和生产环境
// export const BASE_URL = 'http://coderwhy.dev:8000'
// export const BASE_URL = 'http://codercba.prod:8000'

// 2.代码逻辑判断, 判断当前环境
// vite默认提供的环境变量
// console.log(import.meta.env.MODE)
// console.log(import.meta.env.DEV) // 是否开发环境
// console.log(import.meta.env.PROD) // 是否生产环境
// console.log(import.meta.env.SSR) // 是否是服务器端渲染(server side render)

let BASE_URL = "",
  TIME_OUT = 10000;

if (import.meta.env.PROD) {
  // 生产环境
  BASE_URL = "http://codercba.com:5000";
  TIME_OUT = 5000;
} else {
  // 开发环境
  BASE_URL = "http://localhost:8087";
  TIME_OUT = 5000;
}

// console.log(BASE_URL)

// 3.通过创建.env文件直接创建变量
// console.log(import.meta.env.VITE_URL)

export { BASE_URL, TIME_OUT };
