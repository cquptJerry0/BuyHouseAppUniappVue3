// src/router/composables.ts
import { computed } from 'vue'
import router from "./index";
import type { RouteLocation } from "./types";

// 路由钩子函数
export function useRouter() {
  return {
    // 路由导航方法
    push: (location: RouteLocation) => router.push(location),
    replace: (location: RouteLocation) => router.replace(location),
    back: (delta?: number) => router.back(delta),
    reLaunch: (location?: RouteLocation) => router.reLaunch(location),

    // 路由守卫
    beforeEach: router.beforeEach.bind(router),
    afterEach: router.afterEach.bind(router),

    // 辅助方法
    isLoggedIn: router.isLoggedIn.bind(router),
  };
}

// 当前路由钩子函数
export function useRoute() {
  return computed(() => router.currentRoute);
}
