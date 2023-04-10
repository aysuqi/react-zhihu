import "./Store.less";
import MySkeleton from "@/components/MySkeleton";
import NewsItem from "@/components/NewsItem";
import MyNavBar from "@/components/MyNavBar";
import { connect } from "react-redux";
import { useEffect } from "react";
import action from "@/store/action";
import { SwipeAction, Toast } from "antd-mobile";
import api from "@/api";

const Store = props => {
  const { list, queryStoreListAsync, removeStoreListById } = props;

  useEffect(() => {
    if (!list) {
      queryStoreListAsync();
    }
  }, []);

  const handleRemove = async id => {
    try {
      const { code } = await api.storeRemove(id);
      if (+code !== 0) {
        Toast.show({ icon: "fail", content: "移除失败" });
        return;
      }
      Toast.show({ icon: "success", content: "移除成功" });
      removeStoreListById(id);
    } catch (error) {}
  };

  return (
    <div className="store-box">
      <MyNavBar title="我的收藏" />
      {!list ? (
        <MySkeleton />
      ) : (
        <div className="list">
          {list.map(item => {
            let { id, news } = item;
            return (
              <SwipeAction
                key={id}
                rightActions={[
                  {
                    key: "delete",
                    text: "删除",
                    color: "danger",
                    onClick: handleRemove.bind(null, id),
                  },
                ]}
              >
                <NewsItem info={news} />;
              </SwipeAction>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default connect(state => state.store, action.store)(Store);
