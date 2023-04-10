import http from "./http";

/**
 * 获取今日新闻
 * @returns
 */
const queryNewsLatest = () => http.get("/zhi/4/news/latest");

/**
 * 获取往日新闻
 * @param {*} time 时间 20131119
 * @returns
 */
const queryNewsBefore = time => http.get(`/zhi/4/news/before/${time}`);

/**
 * 获取新闻详情
 * @param {*} id
 * @returns
 */
const queryNewsInfo = id => http.get(`/zhi/4/news/${id}`);

/**
 * 获取新闻评论点赞数量信息
 * @param {*} id
 * @returns
 */
const queryNewsStoryExtra = id => http.get(`/zhi/4/story-extra/${id}`);

/**
 * 新闻对应短评论查
 * @param {*} id
 * @returns
 */
const queryStoryShortComments = id =>
  http.get(`/zhi/4/story/${id}/short-comments`);

/**
 * 新闻对应长评论查看
 * @param {*} id
 * @returns
 */
const queryStoryLongComments = id =>
  http.get(`/zhi/4/story/${id}/long-comments`);

/**
 * 主题日报列表查看
 * @returns
 */
const queryNewsThemes = () => http.get("/zhi/4/themes");

/**
 * 主题日报内容查看
 * @param {*} id
 * @returns
 */
const queryNewsThemesById = id => http.get(`/zhi/4/themes/${id}`);

/**
 * 热门消息
 * @returns
 */
const queryNewsHot = () => http.get("/zhi/3/news/hot");

/**
 * 栏目总览
 * @returns
 */
const querySections = () => http.get("/zhi/3/sections");

/**
 * 栏目具体消息查看
 * @param {*} id
 * @returns
 */
const querySectionsById = id => http.get(`/zhi/3/section/${id}`);

const zhihuApi = {
  querySectionsById,
  querySections,
  queryNewsHot,
  queryNewsThemesById,
  queryNewsThemes,
  queryStoryLongComments,
  queryStoryShortComments,
  queryNewsStoryExtra,
  queryNewsInfo,
  queryNewsBefore,
  queryNewsLatest,
};

export default zhihuApi;
