import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import { endpoint } from "../data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductsList from "../components/ProductsList";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const EmptyMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #888;
`;

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Lấy danh sách yêu thích từ API
  const fetchWishlist = () => {
    fetch(`${endpoint}/user/wishList`, {
      headers: {
        authorization: Cookies.get("authToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setWishlist(data);
        } else {
          toast.error("Dữ liệu không hợp lệ");
        }
      })
      .catch((error) => toast.error("Lỗi khi lấy wishlist: " + error))
      .finally(() => setLoading(false));
  };

  // Xóa sản phẩm khỏi danh sách yêu thích
  const handleRemoveItem = (bookId) => {
    fetch(`${endpoint}/user/wishList/${bookId}`, {
      method: "DELETE",
      headers: {
        authorization: Cookies.get("authToken"),
      },
    })
      .then((response) => {
        if (response.ok) {
          fetchWishlist(); // Re-fetch the wishlist after removing an item
          toast.success("Sách đã được xóa khỏi danh sách yêu thích");
        } else {
          toast.error("Lỗi khi xóa sách");
        }
      })
      .catch((error) => toast.error("Lỗi khi xóa sách: " + error));
  };

  return (
    <Container>
          <ProductsList
            books={wishlist} title="Danh sách yêu thích"// Truyền danh sách sản phẩm yêu thích vào ProductsList
            onRemove={handleRemoveItem} // Truyền hàm xóa vào ProductsList
          />
        <ToastContainer />
    </Container>
  );
};

export default WishList;
