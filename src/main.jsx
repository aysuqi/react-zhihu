import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

/* REDUX */
import { Provider } from "react-redux";
import store from "./store";

/* 改变REM换算比例 */
import "lib-flexible";
import "./index.less";

/* ANTD-MOBILE */
import { ConfigProvider } from "antd-mobile";
import zhCh from "antd-mobile/es/locales/zh-CN";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider locale={zhCh}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
);
