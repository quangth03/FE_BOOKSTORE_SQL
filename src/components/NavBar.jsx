import React, { useEffect, useState } from "react";
import { NavLink, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Cookies from "js-cookie";
import { Search, ShoppingCartCheckoutOutlined } from "@mui/icons-material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import { mobile } from "../responsive";
import icon from "../assets/icon.png";
import CustomNavLink from "./CustomNavLink";

const Container = styled.div`
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  height: 60px;
`;

const SearchContainer = styled.form`
  border: 1px solid #ddd;
  display: flex;
  flex: 1;
  align-items: center;
  border-radius: 30px; /* Bo tròn mềm mại */
  margin-left: 25px;
  padding: 10px 15px; /* Tăng padding để có khoảng cách hợp lý */
  height: 40px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Bóng đổ nhẹ */
  transition: box-shadow 0.3s ease-in-out; /* Hiệu ứng chuyển động */

  &:focus-within {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2); /* Tăng bóng đổ khi focus */
  }
`;

const SearchButton = styled.button`
  flex: 0;
  border: none;
  padding: 10px 20px; /* Kích thước vừa vặn cho nút */
  border-radius: 30px; /* Bo tròn cho nút */
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out; /* Hiệu ứng hover */

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Bóng đổ khi hover */
  }
`;

const Input = styled.input`
  border: none;
  outline: none;
  flex: 9;
  ${mobile({ width: "50px" })}

  &:focus {
    outline: none;
  }
`;

const Brand = styled.h1`
  font-weight: bold;
  color: black;
  ${mobile({ fontSize: "24px" })}
  margin-right: 100px;
`;

const Right = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuPopup = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: white;
  z-index: 1;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: none;
  flex-direction: column;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}

  &:hover ${MenuPopup} {
    display: block;
  }
`;

const Navbar = () => {
  const isLoggedIn = Cookies.get("authToken") || false;
  const isAdmin = Cookies.get("isAdmin");

  const MenuButton = styled.div`
    width: 150px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin: 5px;
  `;

  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const searchMatch = useMatch("/search/:title");
  useEffect(() => {
    if (!searchMatch) setQuery("");
  }, [searchMatch]);

  return (
    <Container>
      <Wrapper>
        <Left>
          {!isAdmin ? (
            <NavLink to={"/"} style={{ height: "100%" }}>
              <img src={icon} alt="logo" height="100%" />
            </NavLink>
          ) : (
            <NavLink to={"/admin/dashboard"} style={{ height: "100%" }}>
              <img src={icon} alt="logo" height="100%" />
            </NavLink>
          )}
          {!isAdmin ? (
            <NavLink to={"/"} style={{ textDecoration: "none" }}>
              <Brand>Book Store</Brand>
            </NavLink>
          ) : (
            <NavLink to={"/admin/dashboard"} style={{ textDecoration: "none" }}>
              <Brand>Book Store</Brand>
            </NavLink>
          )}

          {!isAdmin && (
            <SearchContainer>
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                type="text"
                value={query}
                onChange={(e) => {
                  const newQuery = e.target.value;
                  setQuery(newQuery);
                  if (newQuery.trim()) {
                    navigate(`/search/${newQuery}`, { replace: true });
                  } else {
                    navigate(`/`, { replace: true }); // Điều hướng về trang chủ nếu chuỗi rỗng
                  }
                }}
              />
              <SearchButton
                onClick={() => navigate(`/search/${query}`, { replace: true })}
                id="btn-search"
              >
                <Search style={{ color: "gray", fontSize: 16, flex: 1 }} />
              </SearchButton>
            </SearchContainer>
          )}
        </Left>

        <Right>
          {/* Ẩn thông báo và giỏ hàng nếu là admin */}
          {!isAdmin && (
            <>
              {/* <CustomNavLink>
                <MenuItem>
                  <NotificationsOutlinedIcon color="action" />
                  <span>Thông báo</span>
                </MenuItem>
              </CustomNavLink> */}

              <CustomNavLink to={"/cart"}>
                <MenuItem>
                  <ShoppingCartCheckoutOutlined color="action" />
                  <span>Giỏ hàng</span>
                </MenuItem>
              </CustomNavLink>
            </>
          )}

          {isLoggedIn ? (
            <CustomNavLink to={"/profile"}>
              <MenuItem>
                <PersonOutlineOutlinedIcon />
                <span>Tài khoản</span>
              </MenuItem>
            </CustomNavLink>
          ) : (
            <MenuItem>
              <PersonOutlineOutlinedIcon />
              <span>Tài khoản</span>
              <MenuPopup>
                <CustomNavLink to={"/login"}>
                  <MenuButton style={{ backgroundColor: "#153f4f" }}>
                    Đăng nhập
                  </MenuButton>
                </CustomNavLink>
                <CustomNavLink to={"/register"}>
                  <MenuButton style={{ backgroundColor: "#e67926" }}>
                    Đăng ký
                  </MenuButton>
                </CustomNavLink>
              </MenuPopup>
            </MenuItem>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
