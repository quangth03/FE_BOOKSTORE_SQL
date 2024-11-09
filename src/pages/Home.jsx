import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import ProductsList from "../components/ProductsList";
import { endpoint } from "../data";

const Home = () => {
  const [books, setPopularProducts] = useState([]);
  useEffect(() => {
    fetch(`${endpoint}/user/books?limit=8`)
      .then((response) => response.json())
      .then((data) => {
        setPopularProducts(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Slider />
      <Categories />
      <ProductsList books={books} hasButton={true} />
    </div>
  );
};

export default Home;
