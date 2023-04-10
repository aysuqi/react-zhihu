import utils from "@/utils";
import { BASE_INFO } from "../action-types";
const initState = { info: null };

const baseReducer = (state = initState, action) => {
  state = utils.clone(state);
  let { type, info } = action;
  switch (type) {
    // 更新登录信息
    case BASE_INFO:
      state.info = info;
      break;
    default:
  }
  return state;
};

export default baseReducer;
