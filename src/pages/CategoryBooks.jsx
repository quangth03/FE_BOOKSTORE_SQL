import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { endpoint } from "../data";
// import PageNavigation from "../components/PageNavigation";
import ProductsList from "../components/ProductsList";
import { Banner } from "./Search";
import Cookies from "js-cookie";

const CategiryBooks = () => {
  const { id } = useParams();
  const query = new URLSearchParams(window.location.search);
  var current = query.get("page");
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState([]);
  const body = {
    categories: [id],
  };
  useEffect(() => {
    fetch(`${endpoint}/user/books/category?page=${current ? current + 1 : 1}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        if (data[0].books !== null) {
          setBooks(data[0].books);
          setTitle(data[0].name);
        }
      })
      .catch((error) => console.error(error));
  }, [current]);

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
      })
      console.log("Wishlist in WishList component:", wishlist);
  };


  return (
    <div className="container mx-auto">
      <Banner>{title}</Banner>
      <ProductsList books={books} hasBanner={false} wishlist={wishlist} fetchWishlist={fetchWishlist}/>
      {/* <PageNavigation
        current={Number(current)}
        total={5}
        urlPattern={`/category/${id}`}
      /> */}
    </div>
  );
};

export default CategiryBooks;
