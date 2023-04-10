import { lazy } from "react";
import { withKeepAlive } from "keepalive-react-component";
import Home from "@/views/Home/Home";
const routes = [
  {
    path: "/",
    name: "Home",
    component: withKeepAlive(Home, { cacheId: "home", scroll: true }),
    meta: { title: "首页-知乎日报" }
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: lazy(() => import("@/views/Detail/Detail")),
    meta: { title: "详情-知乎日报" }
  },
  {
    path: "/login",
    name: "Login",
    component: lazy(() => import("@/views/Login/Login")),
    meta: { title: "登录-知乎日报" }
  },
  {
    path: "/personal",
    name: "Personal",
    component: lazy(() => import("@/views/Personal/Personal")),
    meta: { title: "个人中心-知乎日报" }
  },
  {
    path: "/store",
    name: "Store",
    component: lazy(() => import("@/views/Store/Store")),
    meta: { title: "收藏-知乎日报" }
  },
  {
    path: '/update',
    name: 'Update',
    component: lazy(() => import("@/views/Update/Update")),
    meta: { title: "修改信息-知乎日报" }
  },
  {
    path: "*",
    name: "NotFound",
    component: lazy(() => import("@/views/NotFound/NotFound")),
    meta: { title: "404-知乎日报" }
  }
]
export default routes;