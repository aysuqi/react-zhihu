import routes from "./routes";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
import { DotLoading, Mask, Toast } from "antd-mobile";
import store from "@/store";
import action from "@/store/action";

const Loading = () => {
  return (
    <Mask visible={true} opacity="thick">
      <DotLoading />
    </Mask>
  );
};

/**
 * 校验是否检验
 * @param {*} path 
 * @returns true： 需要；false：需要校验
 */
const isCheckLogin = path => {
  let {
      base: { info },
    } = store.getState(),
    checkList = ["/personal", "/store", "/update"];
  return !info && checkList.includes(path);
};

/* 对组件进行特殊的处理，把路由信息已属性「props」方式传递 */
const Element = props => {
  const { component: Component, meta, path } = props;
  let isShow = !isCheckLogin(path);
  let [_, setRandom] = useState(0);
  
  useEffect(() => {
    // show = true 不需要校验，执行渲染
    if (isShow) return;
    /* 登录动态检验 */
    (async () => { // 开始校验
      let infoAction = await action.base.queryUserInfoAsync();
      let info = infoAction.info;
      if (!info) {
        // 如果获取后还是不存在:没有登录
        Toast.show({
          icon: "fail",
          content: "请先登录",
        });
        // 跳转到登录页
        options.navigate({
          pathname: "/login",
          search: `?to=${path}`,
        }, {replace: true });
        return;
      }
      // 如果获取到了信息,说明是登录的,我们派发任务把信息存储到容器中
      store.dispatch(infoAction);
      // 修改状态「纯redux的原理」重新渲染组件
      setRandom(+new Date());
    })();
  });

  /* 修改页面标题 */
  let { title = "知乎日报-WebApp" } = meta || {};
  document.title = title;

  /* 获取路由信息，基于「props」传递给组件 */
  const [usp] = useSearchParams();
  let options = {
    navigate: useNavigate(),
    location: useLocation(),
    params: useParams(),
    usp,
  };

  return <>{isShow ? <Component {...options} /> : <Loading />}</>;
};

/* 创建递归「routes」树 */
const createRoute = routes => {
  return (
    <>
      {routes.map(item => {
        let { path, name, children = [] } = item;
        return (
          <Route path={path} key={name} element={<Element {...item} />}>
            {children ? createRoute(children) : null}
          </Route>
        );
      })}
    </>
  );
};

const RouterView = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>{createRoute(routes)}</Routes>
    </Suspense>
  );
};

export default RouterView;
