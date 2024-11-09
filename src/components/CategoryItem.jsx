import styled from "styled-components";
import { mobile } from "../responsive";
import categoryIcon from "../assets/icon_category.png";
import CustomNavLink from "./CustomNavLink";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 150px;
  width: 100px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
`;

const CategoryName = styled.span`
  text-transform: capitalize;
  font-weight: bold;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.image ? item.image : categoryIcon} />
      <CategoryName>
        <CustomNavLink to={`category/${item.id}`}>{item.name}</CustomNavLink>
      </CategoryName>
    </Container>
  );
};

export default CategoryItem;
