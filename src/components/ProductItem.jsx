import styled from "styled-components";
import { colors, endpoint } from "../data";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";

const Container = styled.div.attrs(() => ({
  "data-aos": "fade-up", // Thêm thuộc tính data-aos
}))`
  margin: 0rem 1rem 3rem 1rem;
  width: 17%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  // background-color: ${colors.color2Light};
  position: relative;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: red;
`;

const Image = styled.img`
  // height: 100%;
  // border-radius: 20px;
  z-index: 2;
  // margin-bottom: 10px;
  // padding-top: 10px;
  height: 16rem;
  width: 100%;
  object-fit: fill;
  border: 1px solid #d3d3d3;
  transition: transform 0.3s ease, filter 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    // filter: brightness(1.2); /* Làm sáng ảnh 20% */
  }
`;

const ProductName = styled.div`
  // text-transform: capitalize;
  font-weight: bold;
  font-size: 15pt;
  text-align: center;
  color: ${colors.color2};
  // margin: 5px 0px;
  max-height: 25px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px;
`;
const ActionButtons = styled.div`
  display: flex;
  align-items: center; /* Căn giữa theo chiều dọc */
  justify-content: center;
`;

const Price = styled.p`
  font-weight: 500;
  font-size: 18px;
  padding: 0px;
  color: red;
`;

export const CartButton = styled.div`
  background: linear-gradient(to bottom right, #ef4765, #ff9a5a);
  border: 0;
  border-radius: 12px;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 2.5;
  outline: transparent;
  padding: 0 1rem;
  text-align: center;
  text-decoration: none;
  transition: box-shadow 0.2s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  border-radius: 20px;
  margin: 5px 0px;

  &:not([disabled]):focus {
    box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.5),
      -0.125rem -0.125rem 1rem rgba(239, 71, 101, 0.5),
      0.125rem 0.125rem 1rem rgba(255, 154, 90, 0.5);
  }

  &:not([disabled]):hover {
    box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.5),
      -0.125rem -0.125rem 1rem rgba(239, 71, 101, 0.5),
      0.125rem 0.125rem 1rem rgba(255, 154, 90, 0.5);
  }
`;

export const DisableCartButton = styled.button`
  background: linear-gradient(to bottom right, #ef4765, #ff9a5a);
  border: 0;
  border-radius: 12px;
  color: #ffffff;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
  font-size: 14px;
  cursor: not-allowed;
  font-weight: 500;
  line-height: 2.5;
  outline: transparent;
  padding: 0 1rem;
  text-align: center;
  text-decoration: none;
  transition: box-shadow 0.2s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  border-radius: 20px;
  margin: 5px 0px;
`;

export const ReWishList = styled(FavoriteBorderIcon)`
  margin-left: 5px;
  cursor: pointer;
  color: #f96058; /* Màu trung gian giữa gradient */
  transition: transform 0.3s ease, opacity 0.3s ease;

  &:hover {
    transform: scale(1.1);
    opacity: 0.8;
  }
`;

export const WishList = styled(FavoriteIcon)`
  margin-left: 5px;
  cursor: pointer;
  color: #f96058; /* Màu trung gian giữa gradient */
  transition: transform 0.3s ease, opacity 0.3s ease;

  &:hover {
    transform: scale(1.1);
    opacity: 0.8;
  }
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 20px;
  right: -15px;
  background-color: red;
  color: white;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 10px;
  // border-radius: 10px;
  z-index: 3;
  text-align: center;
  border: 1px solid white;
`;

const SoldOutBadge = styled.div`
  position: absolute;
  top: 7rem;
  left: 49px;
  right: 49px;
  background: linear-gradient(135deg, #7e7e7e, #a9a9a9);
  color: #ffffff;
  font-size: 15px;
  font-weight: bold;
  padding: 8px 12px;
  // border-radius: 10px;
  z-index: 3;
  text-align: center;
  border: 1px solid white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProductItem = ({ item, fetchWishlist, isWishListed }) => {
  const data = {
    book_id: Number(item.id),
    quantity: 1,
  };
  const [wishlistState, setWishlistState] = useState(isWishListed);

  useEffect(() => {
    setWishlistState(isWishListed); // Cập nhật khi isWishListed thay đổi
  }, [isWishListed]);
  const navigate = useNavigate();
  const handleAddToCart = () => {
    if (Cookies.get("authToken") === undefined) {
      // If no authToken, redirect to the login page
      navigate("/login");
      return;
    }
    //Otherwise, proceed to add item to cart
    fetch(`${endpoint}/user/cart`, {
      method: "POST",
      headers: {
        authorization: Cookies.get("authToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Thêm vào giỏ hàng thành công", { autoClose: 2000 });
      })
      .catch((error) => console.error(error));
  };

  const calculatePrice = (price, discount) => {
    return Math.round(price * (1 - discount / 100));
  };
  const sellPrice = calculatePrice(item.price, item.discount);

  const handleAddToWishList = () => {
    if (Cookies.get("authToken") === undefined) {
      // Nếu không có authToken, chuyển hướng tới trang đăng nhập
      navigate("/login");
    } else {
      fetch(`${endpoint}/user/wishList`, {
        method: "POST",
        headers: {
          authorization: Cookies.get("authToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            toast.success("Thêm vào yêu thích thành công", { autoClose: 2000 });
            setWishlistState(true);
            // fetchWishlist();
          } else {
            toast.error("Lỗi khi thêm sách vào danh sách yêu thích", {
              autoClose: 2000,
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleRemoveItem = (bookId) => {
    fetch(`${endpoint}/user/wishList/${bookId}`, {
      method: "DELETE",
      headers: {
        authorization: Cookies.get("authToken"),
      },
    })
      .then((response) => {
        if (response.ok) {
          toast.info("Đã xóa khỏi danh sách yêu thích", { autoClose: 2000 });
          // fetchWishlist();
          setWishlistState(false);
        } else {
          toast.error("Lỗi khi xóa sách");
        }
      })
      .catch((error) => toast.error("Lỗi khi xóa sách: " + error));
  };

  return (
    <Container>
      <Tooltip target=".link" />
      {item.discount > 0 && (
        <DiscountBadge>{`-${item.discount}%`}</DiscountBadge>
      )}
      {item.quantity === 0 && <SoldOutBadge>Hết hàng</SoldOutBadge>}
      <Link
        to={`/books/${item.id}`}
        className="link no-underline text-color"
        data-pr-tooltip={item.title} // Tooltip cho Link
        data-pr-position="right"
      >
        <ImageWrapper>
          <Image src={item.image} />
        </ImageWrapper>
        <ProductName>{item.title}</ProductName>
      </Link>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "30px",
        }}
      >
        <Price>{Number(sellPrice).toLocaleString()}đ</Price>
        {item.discount > 0 && (
          <del style={{ fontSize: "18px" }}>
            {Number(item.price).toLocaleString()}đ
          </del>
        )}
      </div>
      {Cookies.get("isAdmin") ? (
        ""
      ) : (
        <>
          <ActionButtons>
            {item.quantity === 0 ? (
              <DisableCartButton>Thêm vào giỏ hàng</DisableCartButton>
            ) : (
              <CartButton onClick={handleAddToCart}>
                Thêm vào giỏ hàng
              </CartButton>
            )}
            {!wishlistState ? (
              <ReWishList
                style={{ fontSize: "35px" }}
                onClick={handleAddToWishList}
              />
            ) : (
              <WishList
                style={{ fontSize: "35px" }}
                onClick={() => handleRemoveItem(item.id)}
              />
            )}
          </ActionButtons>
        </>
      )}
    </Container>
  );
};
export default ProductItem;
