import "./NewsItem.less";
import { Image } from "antd-mobile";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NewsItem = props => {
  const { info } = props;
  if (!info) return null;
  let { id, title, hint, images, image } = info;
  if (!images) images = [image];
  if (!Array.isArray(images)) images = [""];

  return (
    <div className="news-item">
      <Link to={{ pathname: `/detail/${id}` }}>
        <div className="content">
          <h4 className="title">{title}</h4>
          <p className="author">{hint}</p>
        </div>
        <Image src={images[0]} lazy />
      </Link>
    </div>
  );
};

NewsItem.defaultProps = {
  info: null,
};

NewsItem.propTypes = {
  info: PropTypes.object,
};

export default NewsItem;
