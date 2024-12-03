import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import { endpoint } from "../data";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductsList from "../components/ProductsList";
import { Banner } from "./Search";

import { MyContext } from "../context/wishListContext";

const Container = styled.div``;

const WishList = () => {
  const { setSharedData } = useContext(MyContext);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = () => {
    fetch(`${endpoint}/user/wishList`, {
      headers: {
        authorization: Cookies.get("authToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from API:", data);
        setWishlist(data);
        setSharedData(data); // Update shared data for other components (e.g., Header) when wishlist changes
      })
      .catch((error) => toast.error("Lỗi khi lấy wishlist: " + error));
    console.log("Wishlist in WishList component:", wishlist);
  };

  return (
    <Container className="container mx-auto">
      {wishlist.length > 0 ? (
        <Banner>Danh sách yêu thích</Banner>
      ) : (
        <Banner>Danh sách yêu thích trống</Banner>
      )}
      <ProductsList
        books={wishlist}
        hasBanner={false}
        fetchWishlist={fetchWishlist}
        wishlist={wishlist}
      />
    </Container>
  );
};

export default WishList;
