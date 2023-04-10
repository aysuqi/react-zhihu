import "./HomeHeader.less";
import avatar from "@/assets/react.svg";
import { Image } from "antd-mobile";
import { useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import action from "@/store/action";

const HomeHeader = props => {
  const navigate = useNavigate();

  let { today, info, queryUserInfoAsync } = props;
  let time = useMemo(() => {
    let [, month, day] = today.match(/^\d{4}(\d{2})(\d{2})$/);
    let area = [
      "零",
      "一",
      "二",
      "三",
      "四",
      "五",
      "六",
      "七",
      "八",
      "九",
      "十",
      "十一",
      "十二",
    ];
    return {
      day,
      month: area[+month] + "月",
    };
  }, [today]);

  useEffect(() => {
    if (!info) {
      queryUserInfoAsync();
    }
  }, []);

  return (
    <div className="home-header">
      <div className="info">
        <div className="time">
          <span>{time.day}</span>
          <span>{time.month}</span>
        </div>
        <h2 className="title">知乎日报</h2>
      </div>
      <div className="picture" onClick={() => navigate("/personal")}>
        <Image src={info ? info.pic : avatar} width={36} height={36} />
      </div>
    </div>
  );
};

export default connect(state => state.base, action.base)(HomeHeader);
