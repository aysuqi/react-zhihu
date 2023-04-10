import "./MySkeleton.less";
import { Skeleton } from "antd-mobile";

const MySkeleton = () => {
  return (
    <div className="skeleton-box">
      <Skeleton.Title animated />
      <Skeleton.Paragraph lineCount={5} animated />
    </div>
  );
};
export default MySkeleton;
