import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors, endpoint } from "../data";
import { DeleteOutline } from "@mui/icons-material";
import Cookies from "js-cookie";
import CustomNavLink from "./CustomNavLink";

const Product = styled.div`
  padding: 10px 10px;
  border: 1px solid #eee;
  border-radius: 50px;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  flex: 2;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  flex-wrap: wrap;
  padding: 10px;
  gap: 20px;
`;

const Image = styled.img`
  width: 150px;
  height: 215px;
  flex: 1;
  border-radius: 30px;
`;

const ProductName = styled.span`
  font-size: 20px;
  max-width: 500px;
  flex: 3;
  display: flex;
  justify-content: flex-start;
  padding: 5px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-start;
  flex: 2;
`;

const Price = styled.p`
  font-size: 20px;
  margin: 0;
  flex: none;
  display: flex;
  justify-content: center;
`;

const DiscountPrice = styled(Price)`
  color: #999;
  text-decoration: line-through;
`;

const FinalPrice = styled(Price)`
  color: #000;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  margin-bottom: 10px;
  flex: 1;
  justify-content: center;
  gap: 10px;
`;

const AmountButton = styled.button`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 30%;
  font-size: 15pt;
  border: 1px solid ${colors.color2};
  background-color: white;
  &:hover {
    background-color: ${colors.color2};
    color: white;
  }
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const DeleteButton = styled.button`
  height: 40px;
  width: 40px;
  background-color: white;
  cursor: pointer;
  margin-right: 20px;
  border: none;
  border-radius: 30%;
  &:hover {
    background-color: ${colors.color2};
    color: white;
  }
`;

const CartItem = ({ cartItem, updateCart }) => {
  const [amount, setAmount] = useState(cartItem.cart_details.quantity);

  const data = {
    book_id: cartItem.id,
    quantity: 1,
  };

  const handleRequest = (method, data) => {
    fetch(`${endpoint}/user/cart`, {
      method: method,
      headers: {
        authorization: Cookies.get("authToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => console.error(error));
  };

  const handleDelete = () => {
    const data = {
      book_id: cartItem.id,
    };
    handleRequest("DELETE", data);
    setTimeout(() => {
      updateCart();
    }, 100);
  };

  useEffect(() => {
    setTimeout(() => {
      updateCart();
    }, 100);
  }, [amount]);

  useEffect(() => {
    setAmount(cartItem.cart_details.quantity);
  }, [cartItem]);

  const handleDescrease = () => {
    if (amount >= 1) {
      if (amount > 1) {
        setAmount((prev) => prev - 1);
        data.quantity = -1;
        handleRequest("POST", data);
      } else {
        handleRequest("DELETE", data);
        setAmount((prev) => prev - 1);
      }
    }
  };

  const handleIncrease = () => {
    data.quantity = 1;
    handleRequest("POST", data);
    setAmount((prev) => prev + 1);
  };

  const calculatePrice = (price, discount) => {
    return Math.round(price * (1 - discount / 100));
  };
  const sellPrice = calculatePrice(cartItem.price, cartItem.discount);

  return (
    <div>
      <Product>
        <ProductDetail>
          <Image src={cartItem.image} />
          <ProductName>
            <CustomNavLink to={`/books/${cartItem.id}`}>
              {cartItem.title}
            </CustomNavLink>
          </ProductName>
          <AmountContainer>
            <AmountButton onClick={handleDescrease}>-</AmountButton>
            <Amount>{amount}</Amount>
            <AmountButton onClick={handleIncrease}>+</AmountButton>
          </AmountContainer>
          <PriceContainer>
            <FinalPrice>{Number(sellPrice).toLocaleString()} VND</FinalPrice>
            {cartItem.discount > 0 && (
              <DiscountPrice>
                {Number(cartItem.price).toLocaleString()} VND
              </DiscountPrice>
            )}
          </PriceContainer>
          <Price>
            {Number(cartItem.cart_details.total).toLocaleString()} VND
          </Price>
        </ProductDetail>
        <DeleteButton onClick={handleDelete}>
          <DeleteOutline />
        </DeleteButton>
      </Product>
    </div>
  );
};

export default CartItem;
