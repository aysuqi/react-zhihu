import { NavBar } from "antd-mobile";
import PropTypes from "prop-types";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

const MyNavBar = props => {
  let { title } = props;
  const navigate = useNavigate(),
    location = useLocation(),
    [usp] = useSearchParams();

  const handleBack = () => {
    let to = usp.get("to");
    if (location.pathname === "/login" && /^\/detail\/d+$/.test(to)) {
      navigate(to, { replace: true });
      return;
    }
    navigate(-1);
  };
  return <NavBar onBack={handleBack}>{title}</NavBar>;
};

MyNavBar.defaultProps = {
  title: "个人中心",
};

MyNavBar.protoType = {
  title: PropTypes.string,
};

export default MyNavBar;
