import { reactive } from "vue";
import routes from "./routes";
import { beforeEach, afterEach } from "./guards";
import type {
  Route,
  RouteLocation,
  RouteRecord,
  NavigationGuard,
  RouterOptions,
} from "./types";

class Router {
  // 路由配置
  private routes: RouteRecord[] = [];

  // 路由映射（便于快速查找）
  private routeMap: Map<string, RouteRecord> = new Map();

  // 当前路由
  private _currentRoute = reactive<Route>({
    path: "",
    fullPath: "",
    name: "",
    meta: {},
    query: {},
    params: {},
  });

  // 路由历史
  private history: Route[] = [];

  // 全局前置守卫
  private beforeGuards: NavigationGuard[] = [];

  // 全局后置守卫
  private afterGuards: ((to: Route, from: Route | null) => void)[] = [];

  constructor(options: RouterOptions) {
    this.routes = options.routes;

    // 初始化路由映射
    this.routes.forEach((route) => {
      this.routeMap.set(route.name, route);
    });

    // 注册全局守卫
    this.beforeGuards = [...beforeEach];
    this.afterGuards = [...afterEach];

    // 初始化当前页面路由
    this.initCurrentRoute();
  }

  // 初始化当前路由
  private initCurrentRoute() {
    setTimeout(() => {
      const pages = getCurrentPages();
      if (pages.length > 0) {
        const currentPage = pages[pages.length - 1] as UniApp.PageInstance;
        const path = `/${currentPage.route}`;
        // 兼容不同平台，尝试从$page或options获取查询参数
        const query = (currentPage.$page?.query ||
          currentPage.options ||
          {}) as Record<string, string>;

        // 查找对应的路由记录
        const routeRecord = this.routes.find((r) => r.path === path);
        if (routeRecord) {
          this._currentRoute.path = path;
          this._currentRoute.fullPath = this.getFullPath(path, query);
          this._currentRoute.name = routeRecord.name;
          this._currentRoute.meta = routeRecord.meta;
          this._currentRoute.query = query;
          this._currentRoute.params = {};
        }
      }
    }, 100);
  }

  // 获取路由记录
  private getRouteRecord(location: RouteLocation): RouteRecord | null {
    if (location.name) {
      return this.routeMap.get(location.name) || null;
    }
    if (location.path) {
      return this.routes.find((r) => r.path === location.path) || null;
    }
    return null;
  }

  // 构建完整路径
  private getFullPath(
    path: string,
    query: Record<string, string> = {}
  ): string {
    if (!query || Object.keys(query).length === 0) {
      return path;
    }

    const queryString = Object.entries(query)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    return `${path}?${queryString}`;
  }

  // 运行守卫链
  private async runGuardQueue(
    to: Route,
    from: Route | null,
    guards: NavigationGuard[]
  ): Promise<boolean> {
    for (const guard of guards) {
      // 创建next函数
      let resolved = false;
      let nextCalled = false;

      const next = (nextRoute?: RouteLocation | false | void) => {
        if (nextCalled) {
          console.warn("next已被多次调用");
          return;
        }

        nextCalled = true;

        if (nextRoute === false) {
          // 中断导航
          resolved = false;
        } else if (nextRoute) {
          // 重定向到其他路由
          this.push(nextRoute);
          resolved = false;
        } else {
          // 继续导航
          resolved = true;
        }
      };

      // 执行守卫
      const result = guard(to, from, next);

      // 处理Promise
      if (result instanceof Promise) {
        await result;
      }

      if (!resolved && nextCalled) {
        return false;
      }

      if (!nextCalled) {
        console.warn("导航守卫未调用next()");
      }
    }

    return true;
  }

  // 解析路由目标
  private resolveRoute(location: RouteLocation): Route | null {
    const routeRecord = this.getRouteRecord(location);
    if (!routeRecord) return null;

    const path = routeRecord.path;
    const query = location.query || {};

    return {
      path,
      fullPath: this.getFullPath(path, query),
      name: routeRecord.name,
      meta: routeRecord.meta,
      query,
      params: location.params || {},
    };
  }

  // 路由跳转
  async push(location: RouteLocation): Promise<boolean> {
    // 解析目标路由
    const to = this.resolveRoute(location);
    if (!to) {
      console.error("无效的路由:", location);
      return false;
    }

    const from = this._currentRoute.path ? { ...this._currentRoute } : null;

    // 运行前置守卫
    const canProceed = await this.runGuardQueue(to, from, this.beforeGuards);
    if (!canProceed) return false;

    // 执行跳转
    try {
      if (to.meta.tabBar) {
        await uni.switchTab({ url: to.path });
      } else {
        await uni.navigateTo({ url: to.fullPath });
      }

      // 更新当前路由
      Object.assign(this._currentRoute, to);

      // 添加到历史记录
      this.history.push({ ...to });

      // 运行后置守卫
      this.afterGuards.forEach((guard) => guard(to, from));

      return true;
    } catch (error) {
      console.error("路由跳转失败:", error);
      return false;
    }
  }

  // 替换当前路由
  async replace(location: RouteLocation): Promise<boolean> {
    // 解析目标路由
    const to = this.resolveRoute(location);
    if (!to) {
      console.error("无效的路由:", location);
      return false;
    }

    const from = this._currentRoute.path ? { ...this._currentRoute } : null;

    // 运行前置守卫
    const canProceed = await this.runGuardQueue(to, from, this.beforeGuards);
    if (!canProceed) return false;

    // 执行跳转
    try {
      if (to.meta.tabBar) {
        await uni.switchTab({ url: to.path });
      } else {
        await uni.redirectTo({ url: to.fullPath });
      }

      // 更新当前路由
      Object.assign(this._currentRoute, to);

      // 替换历史记录中的最后一项
      if (this.history.length > 0) {
        this.history[this.history.length - 1] = { ...to };
      } else {
        this.history.push({ ...to });
      }

      // 运行后置守卫
      this.afterGuards.forEach((guard) => guard(to, from));

      return true;
    } catch (error) {
      console.error("路由跳转失败:", error);
      return false;
    }
  }

  // 返回
  async back(delta: number = 1): Promise<boolean> {
    try {
      await uni.navigateBack({ delta });

      // 更新历史记录
      this.history = this.history.slice(0, -delta);

      // 更新当前路由
      if (this.history.length > 0) {
        Object.assign(
          this._currentRoute,
          this.history[this.history.length - 1]
        );
      } else {
        // 如果历史记录为空，可能需要重新初始化
        this.initCurrentRoute();
      }

      return true;
    } catch (error) {
      console.error("返回失败:", error);
      return false;
    }
  }

  // 重启到首页
  async reLaunch(location: RouteLocation = { name: "home" }): Promise<boolean> {
    // 解析目标路由
    const to = this.resolveRoute(location);
    if (!to) {
      console.error("无效的路由:", location);
      return false;
    }

    try {
      await uni.reLaunch({ url: to.fullPath });

      // 重置历史记录
      this.history = [{ ...to }];

      // 更新当前路由
      Object.assign(this._currentRoute, to);

      return true;
    } catch (error) {
      console.error("重启到首页失败:", error);
      return false;
    }
  }

  // 注册前置守卫
  beforeEach(guard: NavigationGuard) {
    this.beforeGuards.push(guard);
    return () => {
      const index = this.beforeGuards.indexOf(guard);
      if (index > -1) this.beforeGuards.splice(index, 1);
    };
  }

  // 注册后置守卫
  afterEach(callback: (to: Route, from: Route | null) => void) {
    this.afterGuards.push(callback);
    return () => {
      const index = this.afterGuards.indexOf(callback);
      if (index > -1) this.afterGuards.splice(index, 1);
    };
  }

  // 获取当前路由
  get currentRoute(): Route {
    return this._currentRoute;
  }

  // 检查是否已登录(辅助方法)
  isLoggedIn(): boolean {
    const token = uni.getStorageSync("token");
    return !!token;
  }
}

// 创建路由实例
const router = new Router({
  routes,
});

export default router;
