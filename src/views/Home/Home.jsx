import "./Home.less";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import utils from "@/utils";
import api from "@/api";
import { Swiper, Image, Divider, DotLoading } from "antd-mobile";
import HomeHeader from "@/components/HomeHeader";
import NewsItem from "@/components/NewsItem";
import MySkeleton from "@/components/MySkeleton";

const Home = () => {
  const [today, setToday] = useState(utils.formatTime(null, "{0}{1}{2}")),
    [bannerData, setBannerData] = useState([]),
    [newsList, setNewsList] = useState([]),
    loadMore = useRef();

  /* 发送请求设置数据 */
  useEffect(() => {
    (async () => {
      try {
        const { date, stories, top_stories } = await api.queryNewsLatest();
        setToday(date);
        setBannerData(top_stories);
        newsList.push({ date, stories });
        setNewsList([...newsList]);
      } catch (_) {}
    })();
  }, []);

  /* 设置监听器，实现触底加载 */
  useEffect(() => {
    let ob = new IntersectionObserver(async changes => {
      let { isIntersecting } = changes[0];
      if (isIntersecting) {
        // 显示加载更多「触底」
        try {
          let time = newsList[newsList.length - 1]["date"];
          let res = await api.queryNewsBefore(time);
          newsList.push(res);
          setNewsList([...newsList]);
        } catch (_) {}
      }
    });
    let loadEl = loadMore.current;
    ob.observe(loadMore.current);

    // 组件释放的时候移除监听事件「手动移除ob」
    return () => {
      ob.unobserve(loadEl);
      ob = null;
    };
  }, []);

  return (
    <div className="home">
      {/* 头部 */}
      <HomeHeader today={today} />
      {/* 轮播图 */}
      <div className="swiper-box">
        {bannerData.length > 0 ? (
          <Swiper autoplay={true} loop={true}>
            {bannerData.map(item => {
              let { id, image, title, hint } = item;
              return (
                <Swiper.Item key={id}>
                  <Link to={{ pathname: `/detail/${id}` }}>
                    <Image src={image} lazy />
                    <div className="desc">
                      <h3 className="title">{title}</h3>
                      <p className="author">{hint}</p>
                    </div>
                  </Link>
                </Swiper.Item>
              );
            })}
          </Swiper>
        ) : null}
      </div>
      {/* 新闻列表 */}
      {newsList.length === 0 ? (
        <MySkeleton />
      ) : (
        <>
          {newsList.map((item, index) => {
            let { date, stories } = item;
            return (
              <div className="news-box" key={index}>
                {index !== 0 ? (
                  <Divider contentPosition="left">
                    {utils.formatTime(date, "{1}月{2}日")}
                  </Divider>
                ) : null}
                <div className="list">
                  {stories.map(cur => {
                    return <NewsItem key={cur.id} info={cur} />;
                  })}
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* 加载更多 */}
      <div
        className="loadmore"
        ref={loadMore}
        style={{
          display: newsList.length === 0 ? "node" : "block",
        }}
      >
        <DotLoading />
        加载更多
      </div>
    </div>
  );
};

export default Home;
