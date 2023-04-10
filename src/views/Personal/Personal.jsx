import "./Presonal.less";
import MyNavBar from "@/components/MyNavBar";
import { List, Image, Toast } from "antd-mobile";
import { StarOutline, UndoOutline } from "antd-mobile-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import action from "@/store/action";
import utils from "@/utils";

const Presonal = props => {
  let { navigate, info, clearUserInfo, clearStoreList } = props;
  const signout = () => {
    // 清除redux中的信息
    clearUserInfo();
    clearStoreList();
    // 清除Token
    utils.storage.remove("tk");
    // 提示
    Toast.show({
      icon: "success",
      content: "您已安全退出",
    });
    // 跳转
    navigate("/login?to=/personal", { replace: true });
  };

  return (
    <div className="presonal">
      <MyNavBar />
      <div className="baseInfo">
        <Link to="/update">
          <Image className="pic" src={info.pic} />
          <p className="name">{info.name}</p>
        </Link>
      </div>
      <List>
        <List.Item prefix={<StarOutline />} onClick={() => navigate("/store")}>
          我的收藏
        </List.Item>
        <List.Item prefix={<UndoOutline />} onClick={signout}>
          退出登录
        </List.Item>
      </List>
    </div>
  );
};

export default connect(state => state.base, {
  ...action.base,
  ...action.store,
})(Presonal);
