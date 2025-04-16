import { NavigationGuard } from "./types";
import type { Route } from "./types";

// 全局前置守卫
export const beforeEach: NavigationGuard[] = [
  // 登录检查守卫
  async (to, from, next) => {
    if (to.meta.auth) {
      const token = uni.getStorageSync("token");
      if (!token) {
        // 未登录时跳转到登录页
        uni.showToast({
          title: "请先登录",
          icon: "none",
        });
        return next({ name: "login", query: { redirect: to.name } });
      }
    }
    next();
  },

  // 页面标题设置
  (to, from, next) => {
    if (to.meta.title) {
      uni.setNavigationBarTitle({
        title: to.meta.title,
      });
    }
    next();
  },
];

// 全局后置守卫
export const afterEach = [
  (to: Route, from: Route | null) => {
    // 页面访问统计
    console.log(`页面切换: ${from?.path || "初始页面"} -> ${to.path}`);

    // 这里可以添加埋点统计等逻辑
  },
];
