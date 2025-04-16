// 扩展uni-app页面实例类型
declare namespace UniApp {
  interface PageInstance {
    // 添加$page属性定义，用于路由信息
    $page: {
      fullPath: string;
      query: Record<string, string>;
    };

    // 添加route和options属性
    route: string;
    options: Record<string, string>;
  }
}

// 定义getCurrentPages返回类型
declare function getCurrentPages(): UniApp.PageInstance[];
