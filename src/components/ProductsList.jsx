import styled from "styled-components";
import { colors } from "../data";
import ProductItem from "./ProductItem";
import CustomNavLink from "./CustomNavLink";

const Container = styled.div`
  width: 100%;
  padding: 20px 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: bold;
  font-size: 40px;
  text-transform: capitalize;

  width: 100%;
  height: 150px;
  color: ${colors.color1};
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const AllProductsButton = styled.div`
  display: block;
  color: white;
  background-color: ${colors.color1};
  padding: 10px 40px;
  border-radius: 20px;
  cursor: pointer;
`;

const Products = ({
  books,
  title = "Sách mới nhất",
  hasBanner = true,
  hasButton = false,
}) => {
  return (
    <>
      {hasBanner ? <Banner>{title}</Banner> : ""}

      <Container>
        {books != null && books.length > 0
          ? books.map((item) => <ProductItem item={item} key={item.id} />)
          : ""}
      </Container>
      {hasButton ? (
        <Wrapper>
          <CustomNavLink to={"/books"}>
            <AllProductsButton>Xem tất cả</AllProductsButton>
          </CustomNavLink>
        </Wrapper>
      ) : (
        ""
      )}
    </>
  );
};

export default Products;
