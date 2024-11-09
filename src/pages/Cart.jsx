import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors, endpoint } from "../data";
import CustomNavLink from "../components/CustomNavLink";
import CartItem from "../components/CartItem";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const TitleCart = styled.h1`
  text-align: center;
  margin-left: 50px;
`;

const Quantity = styled.span`
  font-size: 24px;
  font-weight: 650;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  background-color: transparent;
  &:hover {
    background-color: ${colors.color2};
    color: white;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;
`;

const Info = styled.div`
  flex: 5;
  border-right: 3px solid gray;
`;

const Products = styled.div`
  padding-right: 10px;
`;

const Total = styled.div`
  flex: 2;
  padding: 20px;
  height: 50vh;
`;

const Payment = styled.img`
  width: 70%;
`;

const TotalTitle = styled.h1`
  font-size: 25px;
`;

const TotalItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "25px"};
`;

const TotalText = styled.span``;

const TotalPrice = styled.span``;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [numberOfBooks, setNumberOfBooks] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetCart();
  }, []);

  const handleGetCart = () => {
    fetch(`${endpoint}/user/cart`, {
      headers: {
        authorization: Cookies.get("authToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data.books);
        setNumberOfBooks(data.books.length);
        setTotalAmount(data.total);
      })
      .catch((error) => console.error(error));
  };

  const updateCart = () => {
    handleGetCart();
  };

  const handleCheckout = () => {
    if (cartItems && cartItems.length > 0) {
      fetch(`${endpoint}/user/order`, {
        method: "POST",
        headers: {
          authorization: Cookies.get("authToken"),
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
        })
        .then((data) => {
          navigate("/payment-successful", { state: data });
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div>
      <Container>
        <Wrapper>
          <TitleCart>GIỎ HÀNG CỦA BẠN</TitleCart>
          <Top>
            <CustomNavLink to={"/"}>
              <TopButton>TIẾP TỤC MUA SẮM</TopButton>
            </CustomNavLink>
            <Quantity>{numberOfBooks} sản phẩm</Quantity>
            <TopButton type="filled" onClick={handleCheckout}>
              THANH TOÁN
            </TopButton>
          </Top>
          <Bottom>
            <Info>
              <Products>
                {cartItems
                  ? cartItems.map((cartItem, index) => (
                      <CartItem
                        cartItem={cartItem}
                        key={`cart-item-${index}`}
                        updateCart={updateCart}
                      />
                    ))
                  : ""}
              </Products>
            </Info>
            <Total>
              <TotalTitle>TỔNG ĐƠN HÀNG</TotalTitle>
              <TotalItem>
                <TotalText>Tổng tiền các sản phẩm</TotalText>
                <TotalPrice>
                  {Number(totalAmount).toLocaleString()} VND
                </TotalPrice>
              </TotalItem>
              <TotalItem>
                <TotalText>Phí vận chuyển</TotalText>
                <TotalPrice>{numberOfBooks === 0 ? 0 : "0"} VND</TotalPrice>
              </TotalItem>
              <TotalItem type="total">
                <TotalText>Tổng cộng</TotalText>
                <TotalPrice>
                  {Number(
                    totalAmount + (numberOfBooks === 0 ? 0 : 0)
                  ).toLocaleString()}{" "}
                  VND
                </TotalPrice>
              </TotalItem>
              <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
            </Total>
          </Bottom>
        </Wrapper>
      </Container>
    </div>
  );
};
export default Cart;
