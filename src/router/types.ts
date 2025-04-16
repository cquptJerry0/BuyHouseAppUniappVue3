// 路由元数据
export interface RouteMeta {
  title?: string; // 页面标题
  auth?: boolean; // 是否需要登录认证
  tabBar?: boolean; // 是否显示底部导航栏
  keepAlive?: boolean; // 是否需要缓存
}

// 路由记录
export interface RouteRecord {
  path: string; // 页面路径
  name: string; // 路由名称
  meta: RouteMeta; // 路由元数据
  children?: RouteRecord[]; // 子路由
}

// 路由位置
export interface RouteLocation {
  name?: string; // 路由名称
  path?: string; // 页面路径
  query?: Record<string, string>; // 查询参数
  params?: Record<string, string>; // 路径参数
  fullPath?: string; // 完整路径
  matched?: RouteRecord[]; // 匹配的路由记录
}

// 当前路由
export interface Route {
  path: string; // 路径
  fullPath: string; // 完整路径(含参数)
  name: string; // 名称
  meta: RouteMeta; // 元数据
  query: Record<string, string>; // 查询参数
  params: Record<string, any>; // 路由参数
}

// 路由导航方法
export type NavigationGuard = (
  to: Route,
  from: Route | null,
  next: (to?: RouteLocation | false | void) => void
) => void | Promise<void>;

// 路由选项
export interface RouterOptions {
  routes: RouteRecord[];
}
