import api from "@/api";
import { STORE_LIST, STORE_REMOVE } from "../action-types";

const storeAction = {
  // 异步获取收藏列表,同步到redux中
  async queryStoreListAsync() {
    let list = null;
    try {
      let { code, data } = await api.storeList();
      if (+code === 0) {
        list = data;
      }
    } catch (_) {}
    return {
      type: STORE_LIST,
      list,
    };
  },
  // 清空收藏列表
  clearStoreList() {
    return {
      type: STORE_LIST,
      list: null,
    };
  },
  // 移除某一项收藏
  removeStoreListById(id) {
    return {
      type: STORE_REMOVE,
      id,
    };
  },
};

export default storeAction;
