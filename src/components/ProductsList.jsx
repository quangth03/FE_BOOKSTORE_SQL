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

export const Banner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-weight: bold;
  // font-size: 40px;
  font-size: 35px;
  text-transform: capitalize;

  width: 100%;
  height: 70px;
  // color: ${colors.color1};
  color: ${colors.color2};
`;

const Wrapper = styled.div`
  // width: 100%;
  display: flex;
  justify-content: center;
`;

const AllProductsButton = styled.div`
  display: block;
  color: ${colors.color2};
  font-size: 17px;
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
  fetchWishlist,
  wishlist,
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

      <Container className="bg-white pt-3 mb-3">
        {books != null && books.length > 0
          ? books.map((item) => {
              console.log("wishlist", wishlist);
              // Kiểm tra sản phẩm có trong wishlist hay không
              const isWishListed =
                Array.isArray(wishlist) &&
                wishlist.some((wishlistItem) => wishlistItem.id === item.id);
              return (
                <ProductItem
                  item={item}
                  key={item.id}
                  fetchWishlist={fetchWishlist}
                  isWishListed={isWishListed}
                />
              );
            })
          : ""}
      </Container>
    </>
  );
};

export default Products;
