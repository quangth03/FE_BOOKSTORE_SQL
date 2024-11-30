import styled from "styled-components";
import { colors } from "../data";
import ProductItem from "./ProductItem";
import CustomNavLink from "./CustomNavLink";

const Container = styled.div`
  width: 100%;
  // padding: 0px 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  // align-items: center;
  // border: 1px solid ${colors.color1};
`;

const Banner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-weight: bold;
  font-size: 40px;
  text-transform: capitalize;

  width: 100%;
  height: 100px;
  color: ${colors.color1};
`;

const Wrapper = styled.div`
  // width: 100%;
  display: flex;
  justify-content: center;
`;

const AllProductsButton = styled.div`
  display: block;
  color: ${colors.color1};
  font-size: 20px;
  // background-color: ${colors.color1};
  // padding: 10px 40px;
  // border-radius: 20px;
  cursor: pointer;
`;

const Products = ({
  books,
  title,
  hasBanner = true,
  hasButton = false,
  categorie_id,
}) => {
  return (
    <>
      {hasBanner ? (
        <Banner>
          {title}

          {hasButton ? (
            <Wrapper>
              <CustomNavLink to={`category/${categorie_id}`}>
                <AllProductsButton>Xem thêm &gt;&gt; </AllProductsButton>
              </CustomNavLink>
            </Wrapper>
          ) : (
            ""
          )}
        </Banner>
      ) : (
        ""
      )}

      <Container>
        {books != null && books.length > 0
          ? books.map((item) => <ProductItem item={item} key={item.id} />)
          : ""}
      </Container>
    </>
  );
};

export default Products;
