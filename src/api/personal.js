import http from "./http";

/**
 * 发送验证码
 * @param {*} phone
 * @returns
 */
const sendPhoneCode = phone => http.post("/api/phone_code", { phone });

/**
 * 登录
 * @param {*} phone
 * @param {*} code
 * @returns
 */
const login = (phone, code) => http.post("/api/login", { phone, code });

/**
 * 获取登录者信息
 * @returns
 */
const queryUserInfo = () => http.get("/api/user_info");

/**
 * 收藏新闻
 * @param {*} newsId
 * @returns
 */
const store = newsId => http.post("/api/store", { newsId });

/**
 * 移除收藏
 * @param {*} id
 * @returns
 */
const storeRemove = id => http.get("/api/store_remove", { params: { id } });

/**
 * 获取收藏列表
 * @returns
 */
const storeList = () => http.get("/api/store_list");

/**
 * 图片上传「要求FormData格式」
 * @param {*} file
 * @returns
 */
const upload = file => {
  let fm = new FormData();
  fm.append("file", file);
  return http.post("/api/upload", fm);
};

/**
 * 修改个人信息
 * @param {*} username
 * @param {*} pic
 * @returns
 */
const userUpdate = (username, pic) =>
  http.post("/api/user_update", {
    username,
    pic,
  });

const personal = {
  userUpdate,
  upload,
  storeList,
  storeRemove,
  store,
  queryUserInfo,
  login,
  sendPhoneCode,
}

export default personal;