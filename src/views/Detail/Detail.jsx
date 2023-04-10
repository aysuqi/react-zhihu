import "./Detail.less";
import {
  LeftOutline,
  MessageOutline,
  HeartOutline,
  MoreOutline,
  LikeOutline,
} from "antd-mobile-icons";
import { Badge, Toast } from "antd-mobile";
import { useState, useEffect, useMemo } from "react";
import MySkeleton from "@/components/MySkeleton";
import api from "@/api";
import { flushSync } from "react-dom";
import { connect } from "react-redux";
import action from "@/store/action";

const Detail = props => {
  let {
      navigate,
      location,
      params,
      base: { info: userInfo },
      queryUserInfoAsync,
      store: { list: storeList },
      queryStoreListAsync,
      removeStoreListById,
    } = props,
    [info, setInfo] = useState(null),
    [extra, setExtra] = useState(null);

  /* 创建link标签 */
  let link;
  const handleStyle = res => {
    let { css } = res;
    if (!Array.isArray(css)) return;
    css = css[0];
    if (!css) return;
    // 创建link标签样式 <link rel="stylesheet" href="" className="ref" />
    link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = css;
    document.head.appendChild(link);
  };

  /* 创建图片 */
  const handleImage = res => {
    let imgPlaceHolder = document.querySelector(".img-place-holder");
    if (!imgPlaceHolder) return;
    // 创建大图
    let tempImg = new Image();
    tempImg.src = res.image;
    tempImg.onload = () => {
      imgPlaceHolder.appendChild(tempImg);
    };
    tempImg.onerror = () => {
      let parent = imgPlaceHolder.parentNode;
      parent.parentNode.removeChild(parent);
    };
  };

  /* 第一次渲染完，获取新闻详情信息和处理Css样式 */
  useEffect(() => {
    (async () => {
      try {
        let res = await api.queryNewsInfo(params.id);
        flushSync(() => {
          setInfo(res);
          // 处理样式
          handleStyle(res);
        });
        // 处理图片
        handleImage(res);
      } catch (error) {}
    })();

    // 销毁组件：移除创建的样式
    return () => {
      if (link) document.head.removeChild(link);
    };
  }, []);

  /* 第一次渲染完，获取新闻评论信息 */
  useEffect(() => {
    (async () => {
      try {
        let res = await api.queryNewsStoryExtra(params.id);
        setExtra(res);
      } catch (error) {}
    })();
  }, []);

  /* 第一次渲染完，派发任务同步登录信息 */
  useEffect(() => {
    (async () => {
      // 第一次渲染完:如果userInfo不存在,我们派发任务同步登录者信息
      if (!userInfo) {
        let { info } = await queryUserInfoAsync();
        userInfo = info;
      }
      // 如果已经登录 && 没有收藏列表信息:派发任务同步收藏列表
      if (userInfo && !storeList) {
        queryStoreListAsync();
      }
    })();
  }, []);

  /* 点击收藏 */
  const handleStore = async () => {
    if (!userInfo) {
      // 未登录
      Toast.show({ icon: "fail", content: "请先登录" });
      navigate(`/login?to=${location.pathname}`, { replace: true });
      return;
    }
    // 已经登录:收藏或者移除收藏
    if (isStore) {
      // 移除收藏
      let item = storeList.find(item => {
        return +item.news.id === +params.id;
      });
      if (!item) return;
      let { code } = await api.storeRemove(item.id);
      if (+code !== 0) {
        Toast.show({
          icon: "fail",
          content: "操作失败",
        });
        return;
      }
      Toast.show({
        icon: "success",
        content: "操作成功",
      });
      removeStoreListById(item.id); //告诉redux中也把这一项移除掉
      return;
    }
    // 收藏
    try {
      let { code } = await api.store(params.id);
      if (+code !== 0) {
        Toast.show({ icon: "fail", content: "收藏失败" });
        return;
      }
      Toast.show({ icon: "success", content: "收藏成功" });
      queryStoreListAsync();
    } catch (error) {}
  };

  /*  依赖于收藏列表和路径参数,计算出是否收藏 */
  const isStore = useMemo(() => {
    if (!storeList) return false;
    return storeList.some(item => +item.news.id === +params.id);
  }, [storeList, params]);

  return (
    <div className="detail-box">
      {!info ? (
        <MySkeleton />
      ) : (
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: info.body }}
        ></div>
      )}

      <div className="tab-brar">
        <div className="back" onClick={() => navigate(-1)}>
          <LeftOutline />
        </div>
        <div className="icons">
          <Badge content={extra ? extra.comments : 0}>
            <MessageOutline />
          </Badge>
          <Badge content={extra ? extra.popularity : 0}>
            <LikeOutline />
          </Badge>
          <span className={isStore ? "stored" : ""} onClick={handleStore}>
            <HeartOutline />
          </span>
          <span>
            <MoreOutline />
          </span>
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => {
    return {
      base: state.base,
      store: state.store,
    };
  },
  { ...action.base, ...action.store }
)(Detail);
