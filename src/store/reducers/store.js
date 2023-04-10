import utils from "@/utils";
import { STORE_LIST, STORE_REMOVE } from "../action-types";
const initState = { list: null };

const storeReducer = (state = initState, action) => {
  state = utils.clone(state);

  switch (action.type) {
    case STORE_LIST:
      state.list = action.list;
      break;
    case STORE_REMOVE:
      if (Array.isArray(state.list)) {
        state.list = state.list.filter(item => {
          return +item.id !== +action.id;
        });
      }
      break;
    default:
  }
  return state;
};

export default storeReducer;
