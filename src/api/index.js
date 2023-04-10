import personal from "./personal";
import zhihuApi from "./zhihu";

const api = {
  ...personal,
  // zhihu api
  ...zhihuApi
};

export default api;
