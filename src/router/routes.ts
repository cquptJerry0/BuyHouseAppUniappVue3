// 定义应用路由
import { RouteRecord } from "./types";

// 定义应用路由
const routes: RouteRecord[] = [
  {
    path: "/pages/index/index",
    name: "home",
    meta: {
      title: "首页",
      tabBar: true,
      auth: false,
    },
  },
  {
    path: "/pages/findHouse/index",
    name: "findHouse",
    meta: {
      title: "找房",
      tabBar: true,
      auth: false,
    },
  },
  {
    path: "/pages/friendCircle/index",
    name: "friendCircle",
    meta: {
      title: "房友圈",
      tabBar: true,
      auth: true,
    },
  },
  {
    path: "/pages/message/index",
    name: "message",
    meta: {
      title: "消息",
      tabBar: true,
      auth: true,
    },
  },
  {
    path: "/pages/profile/index",
    name: "profile",
    meta: {
      title: "我的",
      tabBar: true,
      auth: false,
    },
  },
];

export default routes;
