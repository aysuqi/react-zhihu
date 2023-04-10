import utils from "@/utils";
import qs from "qs";
import { Toast } from "antd-mobile";

/**
 * http 核心方法
 * config 配置项
 *  - url 请求地址
 *  - method 请求方式 *GET/DELETE/HEAD/OPTIONS/POST/PUT/PATCH
 *  - credentials 携带资源凭证 *include/ same-origin/omit
 *  - headers:nu11 自定义的请求头信息 「格式必须是纯粹对象」
 *  - body：nul1 请求主体信息「只针对于POST系列请求，根据当前服务器要求，如果用户传递的是一个纯粹对象，需要把其变为urlencoded格式字符串(设定请求头中的「Content-Type」)
 *  - params:null 设定问号传参信息「格式必须是纯粹对象，我们在内部把其拼接到ur1的末尾」
 *  - responseType 预设服务器返回结果的读取方式 *json/ text/arrayBuffer/blob
 *  - signal 中断请求的信号
 */
const http = config => {
  // 初始化配置项 & 校验
  if (!utils.isPlainObject(config)) config = {};
  config = Object.assign(
    {
      url: "",
      method: "GET",
      credential: "include",
      headers: null,
      body: null,
      params: null,
      responseType: "json",
      signal: null,
    },
    config
  );
  if (!config.url) throw new TypeError("url 必须传");
  if (!utils.isPlainObject(config.headers)) config.headers = {};
  if (config.params !== null && !utils.isPlainObject(config.params))
    config.params = null;

  // 处理细节
  let { url, method, credential, headers, body, params, responseType, signal } =
    config;

  // 1、处理问号传参
  if (params) {
    url += `${url.includes("?") ? "&" : "?"}${qs.stringify(params)}`;
  }

  // 2、处理请求主体信息「根据后台的实际情况设置请求头」
  if (utils.isPlainObject(body)) {
    body = qs.stringify(body);
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  }

  //3、处理每个请求都需要传递相同的内容「例如：toke」

  let token = utils.storage.get("tk"),
    safeList = [
      "/user_info",
      "/user_update",
      "/store",
      "/store_remove",
      "/store_list",
    ];
  if (token) {
    let reg = /\/api(\/[^?#]+)/,
      [, $1] = reg.exec(url) || [];
    let isSafe = safeList.some(item => {
      return $1 === item;
    });
    if (isSafe) headers["authorization"] = token;
  }

  // 发送请求
  method = method.toUpperCase();
  config = {
    method,
    credential,
    headers,
    caches: "no-cache",
    signal,
  };
  if (/^(POST|PUT|PATCH)$/i.test(method) && body) config.body = body;

  return fetch(url, config)
    .then(response => {
      let { status, statusText } = response;
      if (/^(2|3)\d{2}$/.test(status)) {
        // 请求成功:根据预设的方式，获取需要的值「text/arrayBuffer/blob」
        let result;
        switch (responseType.toUpperCase()) {
          case "text":
            result = response.text();
            break;
          case "arrayBuffer":
            result = response.arrayBuffer();
            break;
          case "blob":
            result = response.blob();
            break;
          default:
            result = response.json();
        }
        return result;
      }
      // 请求失败：HTTP状态码失败
      return Promise.reject({
        code: -100,
        status,
        statusText,
      });
    })
    .catch(reason => {
      // 处理失败的统一提示
      Toast.show({
        icon: "fail",
        content: "网络繁忙,请稍后再试!",
      });
      return new Promise.reject(reason);
    });
};

/* 快捷方法*/
/* http.get/head/delete/options([url],[config]) 预先指定配置中的url和method */
["GET", "HEAD", "DELETE", "OPTIONS"].forEach(item => {
  http[item.toLowerCase()] = (url, config) => {
    if (!utils.isPlainObject(config)) config = {};
    config["url"] = url;
    config["method"] = item;
    return http(config);
  };
});

/* http.post/put/patch([url],[body],[config]) 预先指定配置中的url、body和method */
["POST", "PUT", "PATCH"].forEach(item => {
  http[item.toLowerCase()] = (url, body, config) => {
    if (!utils.isPlainObject(config)) config = {};
    config["url"] = url;
    config["method"] = item;
    config["body"] = body;
    return http(config);
  };
});

export default http;
