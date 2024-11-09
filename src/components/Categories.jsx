import styled from "styled-components";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import { endpoint } from "../data";
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  overflow-x: scroll;
  scrollbar-width: thin;

  scrollbar-color: #999 #eee;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #eee;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #666;
  }
`;

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${endpoint}/admin/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container>
      {categories && categories.length > 0 ? categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      )) : <p></p>}
    </Container>
  );
};

export default Categories;
