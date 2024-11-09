import React from "react";
import { NavLink } from "react-router-dom";
import { colors } from "../data";
import styled from "styled-components";
import Cookies from "js-cookie";

const Left = styled.div`
  flex: 1;
  border-right: 1px solid black;
  height: 100%;
  cursor: pointer;
`;

const MenuItem = styled.div`
  display: block;
  font-weight: bold;
  padding: 10px;

  color: ${(props) =>
    props.active
      ? colors.color1
      : props.children === "Đăng xuất"
      ? "#fb8277"
      : "black"};
`;

const ProfileLeft = ({ index }) => {
  const menuItem = [
    {
      text: "Thông tin cá nhân",
      link: "/profile",
    },
    {
      text: "Đổi mật khẩu",
      link: "/change-password",
    },
    {
      text: "Chỉnh sửa thông tin cá nhân",
      link: "/update-profile",
    },
    {
      text: "Đơn hàng của bạn",
      link: "/orders",
    },
    {
      text: "Đăng xuất",
      link: "/logout",
    },
  ];

  if (Cookies.get("isAdmin"))
    menuItem.splice(4, 0, {
      text: "Trang quản trị",
      link: "/admin/users",
    });
  return (
    <div>
      <Left>
        {menuItem.map((item, itemIndex) => (
          <NavLink
            to={item.link}
            key={`profile-left-${itemIndex}`}
            style={{ textDecoration: "none" }}
          >
            <MenuItem active={index === itemIndex}>{item.text}</MenuItem>
          </NavLink>
        ))}
      </Left>
    </div>
  );
};

export default ProfileLeft;
