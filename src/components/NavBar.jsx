import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Cookies from "js-cookie";
import { Search, ShoppingCartCheckoutOutlined } from "@mui/icons-material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import axios from "axios";
// import _debounce from "lodash.debounce";

import { mobile } from "../responsive";
import icon from "../assets/img-2.png";
import CustomNavLink from "./CustomNavLink";

const Container = styled.div`
  ${mobile({ height: "50px" })}
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`;

// const SearchContainer = styled.form`
//   border: 1px solid #ddd;
//   display: flex;
//   flex: 1;
//   align-items: center;
//   border-radius: 30px; /* Bo tròn mềm mại */
//   margin-left: 25px;
//   padding: 10px 15px; /* Tăng padding để có khoảng cách hợp lý */
//   height: 40px;
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Bóng đổ nhẹ */
//   transition: box-shadow 0.3s ease-in-out; /* Hiệu ứng chuyển động */

//   &:focus-within {
//     box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2); /* Tăng bóng đổ khi focus */
//   }
// `;

// const SearchButton = styled.button`
//   flex: 0;
//   border: none;
//   padding: 10px 20px; /* Kích thước vừa vặn cho nút */
//   border-radius: 30px; /* Bo tròn cho nút */
//   margin-left: 10px;
//   cursor: pointer;
//   transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out; /* Hiệu ứng hover */

//   &:hover {
//     box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Bóng đổ khi hover */
//   }
// `;

// const Input = styled.input`
//   border: none;
//   outline: none;
//   flex: 9;
//   ${mobile({ width: "50px" })}

//   &:focus {
//     outline: none;
//   }
// `;

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
  padding: 6px 20px;
  background-color: #ffff99;
  border-color: #ffff99;
  border-style: solid;
  border-radius: 30px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
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
  // const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  // const searchMatch = useMatch("/search/:title");
  // useEffect(() => {
  //   if (!searchMatch) setQuery("");
  // }, [searchMatch]);

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

  const searchItems = (event) => {
    const query = event.query.toLowerCase();
    const results = items.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
    setFilteredItems(results);
  };

  //   // Function to handle showing only 5 items and the rest
  // const displayedItems = showAll ? filteredItems : filteredItems.slice(0, 5);

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
        <div className="flex align-items-center">
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
      <Wrapper>
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
          {/* {!isAdmin ? (
            <NavLink to={"/"} style={{ textDecoration: "none" }}>
              <Brand>Book Store</Brand>
            </NavLink>
          ) : (
            <NavLink to={"/admin/dashboard"} style={{ textDecoration: "none" }}>
              <Brand>Book Store</Brand>
            </NavLink>
          )} */}

          {!isAdmin && (
            <div className="p-inputgroup w-8">
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
                // onFocus={() => setValue("")}
              />
              <Button
                icon="pi pi-search"
                label="Tìm kiếm"
                className="p-button-warning"
                onClick={() => {
                  navigate(`/search/${query}`, { replace: true });
                  setQuery("");
                }}
              />
            </div>
            // <SearchContainer>
            //   <Input
            //     placeholder="Tìm kiếm sản phẩm..."
            //     type="text"
            //     value={query}
            //     onChange={(e) => {
            //       const newQuery = e.target.value;
            //       setQuery(newQuery);
            //       if (newQuery.trim()) {
            //         navigate(`/search/${newQuery}`, { replace: true });
            //       } else {
            //         navigate(`/`, { replace: true }); // Điều hướng về trang chủ nếu chuỗi rỗng
            //       }
            //     }}
            //   />
            //   <SearchButton
            //     onClick={() => navigate(`/search/${query}`, { replace: true })}
            //     id="btn-search"
            //   >
            //     <Search style={{ color: "gray", fontSize: 16, flex: 1 }} />
            //   </SearchButton>
            // </SearchContainer>
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

// import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import Cookies from "js-cookie";
// import { Search, ShoppingCartCheckoutOutlined } from "@mui/icons-material";
// import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// import "primeflex/primeflex.css";
// import "primeicons/primeicons.css";
// import "primereact/resources/primereact.min.css";
// import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
// import { AutoComplete } from "primereact/autocomplete";
// import { Button } from "primereact/button";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { mobile } from "../responsive";
// import icon from "../assets/img-2.png";
// import CustomNavLink from "./CustomNavLink";

// const Container = styled.div`
//   ${mobile({ height: "50px" })};
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
// `;

// const Wrapper = styled.div`
//   padding: 10px 20px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   ${mobile({ padding: "10px 0px" })}
// `;

// const Left = styled.div`
//   flex: 8;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   height: 60px;
// `;

// const Brand = styled.h1`
//   font-weight: bold;
//   color: black;
//   ${mobile({ fontSize: "24px" })};
//   margin-right: 100px;
// `;

// const Right = styled.div`
//   flex: 2;
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
//   ${mobile({ flex: 2, justifyContent: "center" })}
// `;

// const MenuItem = styled.div`
//   padding: 6px 20px;
//   background-color: #ffff99;
//   border-color: #ffff99;
//   border-style: solid;
//   border-radius: 30px;
//   font-size: 14px;
//   cursor: pointer;
//   margin-left: 25px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   ${mobile({ fontSize: "12px", marginLeft: "10px" })}
// `;

// const Navbar = () => {
//   const isLoggedIn = Cookies.get("authToken") || false;
//   const isAdmin = Cookies.get("isAdmin");
//   const [query, setQuery] = useState("");
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [items, setItems] = useState([]);
//   const [showAll, setShowAll] = useState(false); // State to toggle view for all items
//   const navigate = useNavigate();

//   // Fetch items from API
//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/user/books");
//         setItems(response.data); // Store all items in state
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchItems(); // Call API when the component mounts
//   }, []);

//   const searchItems = (event) => {
//     const query = event.query.toLowerCase();
//     const results = items.filter((item) =>
//       item.title.toLowerCase().includes(query)
//     );
//     setFilteredItems(results);
//   };

//   // Function to handle showing only 5 items and the rest
//   const displayedItems = showAll ? filteredItems : filteredItems.slice(0, 5);

//   const itemTemplate = (item) => (
//     <Link to={`/books/${item.id}`} className="link no-underline text-color">
//       <div className="flex align-items-center">
//         <img src={item.image} alt={item.title} width="50" className="mr-2" />
//         <div className="flex flex-column w-13rem">
//           <span className="font-bold">{item.title}</span>
//           <div className="flex justify-content-between align-items-center">
//             <span className="text-red-500 font-semibold text-sm mr-4">
//               {Number(
//                 (item.price * (1 - item.discount / 100)).toFixed(3)
//               ).toLocaleString()}{" "}
//               VNĐ
//             </span>
//             <del className="text-sm mr-4">
//               {Number(item.price).toLocaleString()} VND
//             </del>
//             <span className="bg-red-400 p-1 border-round text-white text-sm">
//               -{item.discount}%
//             </span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );

//   return (
//     <Container>
//       <Wrapper>
//         <Left>
//           {!isAdmin ? (
//             <NavLink
//               to={"/"}
//               style={{
//                 height: "100%",
//                 display: "flex",
//                 alignItems: "center",
//                 textDecoration: "none",
//               }}
//             >
//               <img src={icon} alt="logo" height="100%" />
//               <Brand>Book Store</Brand>
//             </NavLink>
//           ) : (
//             <NavLink to={"/admin/dashboard"} style={{ height: "100%" }}>
//               <img src={icon} alt="logo" height="100%" />
//               <Brand>Book Store</Brand>
//             </NavLink>
//           )}
//           <div className="p-inputgroup w-8">
//             <AutoComplete
//               value={query}
//               suggestions={filteredItems}
//               completeMethod={searchItems}
//               field="title"
//               placeholder="Tìm kiếm sản phẩm"
//               itemTemplate={itemTemplate}
//               onChange={(e) => setQuery(e.target.value)}
//             />
//             <Button
//               icon="pi pi-search"
//               label="Tìm kiếm"
//               className="p-button-warning"
//               onClick={() => navigate(`/search/${query}`, { replace: true })}
//             />
//           </div>
//         </Left>

//         <Right>
//           {!isAdmin && (
//             <>
//               <CustomNavLink to={"/cart"}>
//                 <MenuItem>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <ShoppingCartCheckoutOutlined color="" />
//                     <span>Giỏ hàng</span>
//                   </div>
//                 </MenuItem>
//               </CustomNavLink>
//             </>
//           )}

//           {isLoggedIn ? (
//             <CustomNavLink to={"/profile"}>
//               <MenuItem>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <PersonOutlineOutlinedIcon />
//                   <span>Tài khoản</span>
//                 </div>
//               </MenuItem>
//             </CustomNavLink>
//           ) : (
//             <MenuItem>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <PersonOutlineOutlinedIcon />
//                 <span>Tài khoản</span>
//               </div>
//               <div>
//                 <CustomNavLink to={"/login"}>
//                   <Button>Đăng nhập</Button>
//                 </CustomNavLink>
//                 <CustomNavLink to={"/register"}>
//                   <Button>Đăng ký</Button>
//                 </CustomNavLink>
//               </div>
//             </MenuItem>
//           )}
//         </Right>
//       </Wrapper>
//       <div>
//         {/* Display the items, limited to 5 or all if showAll is true */}
//         {displayedItems.map((item) => itemTemplate(item))}
//         {!showAll && filteredItems.length > 5 && (
//           <div
//             style={{ cursor: "pointer", color: "blue", textAlign: "center" }}
//             onClick={() => setShowAll(true)}
//           >
//             Xem thêm...
//           </div>
//         )}
//       </div>
//     </Container>
//   );
// };

// export default Navbar;
