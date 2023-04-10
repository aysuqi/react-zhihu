import "./Update.less";
import MyNavBar from '@/components/MyNavBar';
import { List } from "antd-mobile";
import { connect } from "react-redux";

const Update = (props) => {
  let { info } = props;
  return <div className="update">
    <MyNavBar title="修改个人信息" />
  </div>
}

export default connect(state => state.base)(Update);