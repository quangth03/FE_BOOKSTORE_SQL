import React, { useEffect, useState } from "react";
import ProductsList from "../components/ProductsList";
import { useParams } from "react-router-dom";
import { endpoint } from "../data";
import styled from "styled-components";
import { colors } from "../data";

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
  return (
    <div className="container mx-auto">
      <Banner>{title}</Banner>
      <ProductsList books={books} hasBanner={false} />
      {/* <PageNavigation current={Number(current)} total={5} urlPattern="/books" /> */}
    </div>
  );
};

export default Search;
