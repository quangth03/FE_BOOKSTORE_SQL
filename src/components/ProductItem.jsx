import styled from "styled-components";
import { colors, endpoint } from "../data";
import iconCategory from "../assets/icon_category.png";
import CustomNavLink from "./CustomNavLink";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  margin: 15px;
  width: 20%;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${colors.color2Light};
  position: relative;
  cursor: pointer;
  border-radius: 20px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  height: 100%;
  border-radius: 20px;
  z-index: 2;
  margin-bottom: 10px;
`;

const ProductName = styled.div`
  text-transform: capitalize;
  font-weight: bold;
  font-size: 15pt;
  text-align: center;
  color: ${colors.color2};
  margin: 5px 0px;
  max-height: 25px;
  overflow: hidden;
`;
const Price = styled.p`
  font-weight: 200;
  font-size: 20px;
  padding: 0px;
  color: red;
`;

export const CartButton = styled.div`
  background: linear-gradient(to bottom right, #ef4765, #ff9a5a);
  border: 0;
  border-radius: 12px;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 2.5;
  outline: transparent;
  padding: 0 1rem;
  text-align: center;
  text-decoration: none;
  transition: box-shadow 0.2s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  border-radius: 20px;
  margin: 5px 0px;

  &:not([disabled]):focus {
    box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.5),
      -0.125rem -0.125rem 1rem rgba(239, 71, 101, 0.5),
      0.125rem 0.125rem 1rem rgba(255, 154, 90, 0.5);
  }

  &:not([disabled]):hover {
    box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.5),
      -0.125rem -0.125rem 1rem rgba(239, 71, 101, 0.5),
      0.125rem 0.125rem 1rem rgba(255, 154, 90, 0.5);
  }
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: red;
  color: white;
  font-size: 15px;
  font-weight: bold;
  padding: 7px 12px;
  border-radius: 10px;
  z-index: 3;
  text-align: center;
`;

const ProductItem = ({ item }) => {
  const data = {
    book_id: Number(item.id),
    quantity: 1,
  };

  const navigate = useNavigate();
  const handleAddToCart = () => {
    if (Cookies.get("authToken") === undefined) {
      // If no authToken, redirect to the login page
      navigate("/login");
    }
    //Otherwise, proceed to add item to cart
    fetch(`${endpoint}/user/cart`, {
      method: "POST",
      headers: {
        authorization: Cookies.get("authToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success or update cart state as needed
      })
      .catch((error) => console.error(error));
    toast.success("Thêm vào giỏ hàng thành công");
  };
  // };

  const calculatePrice = (price, discount) => {
    return Math.round(price * (1 - discount / 100));
  };
  const sellPrice = calculatePrice(item.price, item.discount);

  return (
    <Container>
      {item.discount > 0 && (
        <DiscountBadge>{`-${item.discount}%`}</DiscountBadge>
      )}
      <CustomNavLink to={`/books/${item.id}`} width={"100%"} height={"60%"}>
        <ImageWrapper>
          <Image src={item.image} />
        </ImageWrapper>
      </CustomNavLink>

      <CustomNavLink to={`/books/${item.id}`}>
        <ProductName>{item.title}</ProductName>
      </CustomNavLink>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Price>{Number(sellPrice).toLocaleString()} VND</Price>
        {item.discount > 0 && (
          <del style={{ fontSize: "18px" }}>
            {Number(item.price).toLocaleString()} VND
          </del>
        )}
      </div>
      {Cookies.get("isAdmin") ? (
        ""
      ) : (
        <>
          <CartButton onClick={handleAddToCart}>Thêm vào giỏ hàng</CartButton>
          <ToastContainer />
        </>
      )}
    </Container>
  );
};

export default ProductItem;
