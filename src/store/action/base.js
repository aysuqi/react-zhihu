import api from "@/api";
import { BASE_INFO } from "../action-types";

const baseAction = {
  // 异步获取登录信息，完成派发
  async queryUserInfoAsync() {
    let info = null;
    try {
      let { code, data } = await api.queryUserInfo();
      if (+code === 0) {
        info = data;
      }
    } catch (_) {}
    return {
      type: BASE_INFO,
      info,
    };
  },
  // 清除登录信息
  clearUserInfo() {
    return {
      type: BASE_INFO,
      info: null,
    };
  },
};

export default baseAction;
