import React, { useEffect, useState } from "react";
import ProductsList from "../components/ProductsList";
import { useParams } from "react-router-dom";
import { endpoint } from "../data";

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
    <div>
      <ProductsList books={books} title={title} />
      {/* <PageNavigation current={Number(current)} total={5} urlPattern="/books" /> */}
    </div>
  );
};

export default Search;
