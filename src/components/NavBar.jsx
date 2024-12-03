import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Cookies from "js-cookie";
import { Search, ShoppingCartCheckoutOutlined } from "@mui/icons-material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import axios from "axios";

import { mobile } from "../responsive";
import icon from "../assets/img-2.png";
import CustomNavLink from "./CustomNavLink";
import Banner from "./Banner";

const Container = styled.div`
  ${mobile({ height: "50px" })}
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled.div`
  padding: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 69.5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`;

const Brand = styled.h1`
  font-weight: bold;
  color: black;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 30.5%;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuPopup = styled.div`
  position: absolute;
  top: 100px;
  right: 250px;
  background-color: white;
  z-index: 1;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: none;
  flex-direction: column;
`;

const MenuItem = styled.div`
  padding: 6px 16px;
  background-color: #ffff99;
  border-color: #ffff99;
  border-style: solid;
  border-radius: 30px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}

  &:hover ${MenuPopup} {
    display: block;
    color: #ffff33;
  }
`;

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
const Navbar = () => {
  const isLoggedIn = Cookies.get("authToken") || false;
  const isAdmin = Cookies.get("isAdmin");

  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // Gọi API lấy dữ liệu danh sách sách
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user/books");
        setItems(response.data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchItems(); // Gọi API khi component mount
  }, []);

  // // Hàm debounce cho việc tìm kiếm
  // const handleSearchChange = _debounce((query) => {
  //   setSearchQuery(query); // Cập nhật từ khóa tìm kiếm
  // }, 500); // Giới hạn mỗi lần gọi API cách nhau 500ms

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = "vi-VN"; // Đặt ngôn ngữ là tiếng Việt
  // recognition.lang = "en-US"; // Đặt ngôn ngữ là tiếng Anh

  // Hàm bắt đầu nhận diện giọng nói
  const startSpeechRecognition = () => {
    recognition.start();
  };

  // Lắng nghe sự kiện khi nhận diện xong
  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    const cleanedTranscript = transcript.replace(/[.,]/g, ""); // Xóa dấu chấm, phẩy
    setQuery(cleanedTranscript); // Cập nhật kết quả nhận diện giọng nói vào query
    triggerSearch(cleanedTranscript); // Tự động gọi hàm tìm kiếm sau khi nhận diện
  };

  // Hàm tìm kiếm (giống như khi nhấn nút Tìm kiếm)
  const triggerSearch = (query) => {
    navigate(`/search/${query}`, { replace: true });
    setQuery(""); // Sau khi tìm kiếm xong, reset query
  };

  const searchItems = (event) => {
    const query = event.query.toLowerCase();
    const results = items.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
    setFilteredItems(results);
  };

  // Custom item template for AutoComplete
  const itemTemplate = (item) => {
    if (item.isMore) {
      return (
        <div
          className="flex justify-content-center align-items-center p-2"
          onClick={() => {
            navigate(`/search/${query}`, { replace: true });
            setQuery(""); // Đặt lại giá trị input thành rỗng
          }}
          style={{ cursor: "pointer", color: "blue" }}
        >
          <span className="font-bold">Xem thêm {item.remaining} sản phẩm</span>
        </div>
      );
    }
    return (
      <Link to={`/books/${item.id}`} className="link no-underline text-color">
        <div className="flex align-items-center" onClick={() => setQuery("")}>
          <img src={item.image} alt={item.title} width="50" className="mr-2" />
          <div className="flex flex-column w-13rem">
            <span className="font-bold mb-2">{item.title}</span>
            <div className="flex justify-content-between align-items-center">
              {item.discount > 0 ? (
                <div>
                  <span className="text-red-500 font-semibold text-sm mr-4">
                    {Number(
                      (item.price * (1 - item.discount / 100)).toFixed(3)
                    ).toLocaleString()}{" "}
                    VNĐ
                  </span>
                  <del className="text-sm mr-4">
                    {Number(item.price).toLocaleString()} VND
                  </del>
                  <span className="bg-red-400 p-1 border-round text-white text-sm">
                    -{item.discount}%
                  </span>
                </div>
              ) : (
                <span className="text-red-500 font-semibold text-sm">
                  {Number(item.price).toLocaleString()} VND
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <Container>
      <Banner />
      <Wrapper className="container mx-auto">
        <Left>
          {!isAdmin ? (
            <NavLink
              to={"/"}
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <img src={icon} alt="logo" height="100%" />
              <Brand>Book Store</Brand>
            </NavLink>
          ) : (
            <NavLink
              to={"/admin/dashboard"}
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <img src={icon} alt="logo" height="100%" />
              <Brand>Book Store</Brand>
            </NavLink>
          )}
          {!isAdmin && (
            <div className="p-inputgroup" style={{ width: "550px" }}>
              <AutoComplete
                value={query}
                suggestions={[
                  ...filteredItems.slice(0, 4),
                  ...(filteredItems.length > 4
                    ? [{ isMore: true, remaining: filteredItems.length - 4 }]
                    : []),
                ]}
                completeMethod={searchItems}
                field="title"
                placeholder="Tìm kiếm sản phẩm"
                itemTemplate={itemTemplate}
                onChange={(e) => {
                  const selectedItem = e.value;
                  // Kiểm tra nếu mục được chọn là "Xem thêm", không thay đổi `query`
                  if (!selectedItem.isMore) {
                    setQuery(e.value);
                  }
                }}
                panelStyle={{ maxHeight: "auto" }}
                onFocus={() => setQuery("")}
              />
              <Button
                label="Tìm kiếm"
                className="p-button-warning border-round-right"
                onClick={() => {
                  navigate(`/search/${query}`, { replace: true });
                  setQuery("");
                }}
              />
              <Button
                style={{ marginLeft: "10px", borderRadius: "50px" }}
                icon="pi pi-microphone"
                className="p-button-warning p-ml-2"
                onClick={startSpeechRecognition}
              />
            </div>
          )}
        </Left>

        <Right>
          {/* Ẩn thông báo và giỏ hàng nếu là admin */}
          {!isAdmin && (
            <>
              <CustomNavLink to={"/cart"}>
                <MenuItem>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ShoppingCartCheckoutOutlined color="" />
                    <span>Giỏ hàng</span>
                  </div>
                </MenuItem>
              </CustomNavLink>

              <CustomNavLink to={"/wishlist"}>
                <MenuItem>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FavoriteBorderIcon color="" />
                    <span>Yêu thích</span>
                  </div>
                </MenuItem>
              </CustomNavLink>
            </>
          )}

          {isLoggedIn ? (
            <CustomNavLink to={"/profile"}>
              <MenuItem>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <PersonOutlineOutlinedIcon />
                  <span>Tài khoản</span>
                </div>
              </MenuItem>
            </CustomNavLink>
          ) : (
            <MenuItem>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PersonOutlineOutlinedIcon />
                <span>Tài khoản</span>
              </div>
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
