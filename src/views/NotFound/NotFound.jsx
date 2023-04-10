import "./NotFound.less";
import { ErrorBlock, Button } from "antd-mobile";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound">
      <ErrorBlock
        status="empty"
        title="您访问的页面不存在"
        description="去逛逛其他页面吧"
      />
      <div className="btn">
        <Button onClick={() => navigate(-1)}>返回上一页</Button>

        <Button
          color="primary"
          onClick={() => navigate("/", { replace: true })}
        >
          回到首页
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
