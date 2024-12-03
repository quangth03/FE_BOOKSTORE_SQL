import React, { useEffect, useState } from "react";
import ProductsList from "../components/ProductsList";
import { useParams } from "react-router-dom";
import { endpoint } from "../data";
import styled from "styled-components";
import { colors } from "../data";
import Cookies from "js-cookie";

export const Banner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: bold;
  font-size: 40px;
  text-transform: capitalize;

  width: 100%;
  height: 100px;
  color: ${colors.color1};
`;

const Search = () => {
  const { title } = useParams();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch(`${endpoint}/user/books?title=${title}`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => console.error(error));
  }, [title]);
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
      {/* <PageNavigation current={Number(current)} total={5} urlPattern="/books" /> */}
    </div>
  );
};

export default Search;
