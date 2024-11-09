import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { endpoint } from "../data";
import PageNavigation from "../components/PageNavigation";
import ProductsList from "../components/ProductsList";

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
  return (
    <div>
      <ProductsList books={books} title={title} />
      <PageNavigation
        current={Number(current)}
        total={5}
        urlPattern={`/category/${id}`}
      />
    </div>
  );
};

export default CategiryBooks;
