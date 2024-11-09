import React, { useEffect, useState } from "react";
import ProductsList from "../components/ProductsList";
import { endpoint } from "../data";
import PageNavigation from "../components/PageNavigation";

const ProductsPage = () => {
  const query = new URLSearchParams(window.location.search);
  var current = query.get("page");
  const [books, setPopularProducts] = useState([]);
  useEffect(() => {
    fetch(`${endpoint}/user/books?limit=12&page=${Number(current) + 1}`)
      .then((response) => response.json())
      .then((data) => {
        setPopularProducts(data);
      })
      .catch((error) => console.error(error));
  }, [current]);
  return (
    <>
      <ProductsList books={books} title="Tất cả sản phẩm" />
      <PageNavigation current={Number(current)} total={5} urlPattern="/books" />
    </>
  );
};

export default ProductsPage;
