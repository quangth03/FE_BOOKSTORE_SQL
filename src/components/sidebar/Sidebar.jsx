import "./sidebar.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import { Link } from "react-router-dom";
import { CategoryOutlined } from "@mui/icons-material";
import CommentIcon from "@mui/icons-material/Comment";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="center">
        <ul>
          <p className="title">DANH SÁCH</p>
          <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
            <li>
              <InsertChartIcon className="icon" />
              <span>Thống kê</span>
            </li>
          </Link>
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Người dùng</span>
            </li>
          </Link>
          <Link to="/admin/books" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Sản phẩm</span>
            </li>
            <Link to="/admin/discounts" style={{ textDecoration: "none" }}>
            <li>
              <LocalOfferIcon className="icon" />
              <span>Giảm giá</span>
            </li>
          </Link>
          </Link>
          <Link to="/admin/order/all" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Đơn hàng</span>
            </li>
          </Link>
          <Link to="/admin/categories" style={{ textDecoration: "none" }}>
            <li>
              <CategoryOutlined className="icon" />
              <span>Thể loại</span>
            </li>
          </Link>
          <Link to="/admin/comments" style={{ textDecoration: "none" }}>
            <li>
              <CommentIcon className="icon" />
              <span>Bình luận và Đánh giá</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
