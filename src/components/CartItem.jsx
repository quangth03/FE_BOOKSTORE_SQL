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
  width: 92%;
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
  max-width: 200px;
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

const Amount = styled.input.attrs({ type: "number" })`
  width: 70px;
  height: 30px;
  border: 1px solid ${colors.color2};
  border-radius: 8%;
  text-align: center;
  font-size: 16px;
  margin: 0px 5px;
  appearance: textfield; /* Hide default styling for all browsers */

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none; /* Hide spin buttons for WebKit browsers */
    margin: 0;
  }
`;

// const Amount = styled.span`
//   width: 30px;
//   height: 30px;
//   border: none;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 0px 5px;
// `;

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

const CartItem = ({ cartItem, updateCart, hidden }) => {
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
    // console.log("Amount:", amount);
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
        handleDelete();
      }
    }
  };

  const handleIncrease = () => {
    data.quantity = 1;
    if (cartItem.quantity > amount) {
      handleRequest("POST", data);
      setAmount((prev) => prev + 1);
    }
  };

  // const handleChange = (e) => {
  //   const newValue = e.target.value;
  //   const min = 1;
  //   const max = cartItem.quantity;

  //   if (newValue === "") {
  //     setAmount("");
  //   } else if (parseInt(newValue) < min) {
  //     setAmount(min);
  //   }
  //   // else if (parseInt(newValue) > max) {
  //   //   setAmount(max);
  //   // }
  //   else {
  //     setAmount(parseInt(newValue));
  //     const data = {
  //       book_id: cartItem.id,
  //       quantity: parseInt(amount),
  //     };
  //     handleRequest("POST", data);
  //     // cartItem.cart_details.quantity = parseInt(newValue);
  //   }
  // };
  const [totalPrice, setTotalPrice] = useState(cartItem.cart_details.total);
  const isVip = Cookies.get("isVip");
  const calculatePrice = (price, discount) => {
    if (isVip) {
      return Math.round(price * (1 - (2 * discount) / 100));
    }
    return Math.round(price * (1 - discount / 100));
  };
  const sellPrice = calculatePrice(cartItem.price, cartItem.discount);

  useEffect(() => {
    const updatedPrice = amount * sellPrice; // Giá trị mới dựa trên số lượng
    setTotalPrice(updatedPrice);
  }, [amount, sellPrice]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    const min = 1;
    const max = cartItem.quantity;

    if (newValue === "") {
      setAmount("");
      setTimeout(() => {
        updateCart();
      }, 100);
    } else if (parseInt(newValue) < min) {
      setAmount(min);
      const quantity = min;
      const data = {
        book_id: cartItem.id,
        quantity: quantity - cartItem.cart_details.quantity, // Tính chênh lệch số lượng
      };
      handleRequest("POST", data);
      setTimeout(() => {
        updateCart();
      }, 100);
    } else if (parseInt(newValue) > max) {
      setAmount(max);
      const quantity = max;
      const data = {
        book_id: cartItem.id,
        quantity: quantity - cartItem.cart_details.quantity, // Tính chênh lệch số lượng
      };
      handleRequest("POST", data);
      setTimeout(() => {
        updateCart();
      }, 100);
    } else {
      const quantity = parseInt(newValue);
      setAmount(quantity);
      const data = {
        book_id: cartItem.id,
        quantity: quantity - cartItem.cart_details.quantity, // Tính chênh lệch số lượng
      };
      handleRequest("POST", data);
      setTimeout(() => {
        updateCart();
      }, 100);
    }
  };

  return (
    <div>
      <Product>
        <ProductDetail>
          <CustomNavLink to={`/books/${cartItem.id}`}>
            <Image src={cartItem.image} />
          </CustomNavLink>
          <ProductName>
            <CustomNavLink to={`/books/${cartItem.id}`}>
              {cartItem.title}{" "}
              {hidden ? (
                <div style={{ color: "red", marginTop: "15px" }}>
                  Số lượng: {cartItem.cart_details.quantity}
                </div>
              ) : (
                <div style={{ color: "red", marginTop: "15px" }}>
                  Số lượng: {cartItem.quantity}
                </div>
              )}
            </CustomNavLink>
          </ProductName>
          {hidden ? (
            ""
          ) : (
            <AmountContainer>
              <AmountButton onClick={handleDescrease}>-</AmountButton>
              {/* <Amount>{amount}</Amount> */}
              <Amount value={amount} onChange={handleChange}></Amount>
              <AmountButton onClick={handleIncrease}>+</AmountButton>
            </AmountContainer>
          )}
          <PriceContainer>
            <FinalPrice>
              {Number(parseInt(sellPrice)).toLocaleString()} VND
            </FinalPrice>
            {cartItem.discount > 0 && (
              <DiscountPrice>
                {Number(cartItem.price).toLocaleString()} VND
              </DiscountPrice>
            )}
          </PriceContainer>
          {/* <Price>
            {Number(cartItem.cart_details.total).toLocaleString()} VND
          </Price> */}
          <Price>{Number(parseInt(totalPrice)).toLocaleString()} VND</Price>
        </ProductDetail>
        {hidden ? (
          ""
        ) : (
          <DeleteButton onClick={handleDelete}>
            <DeleteOutline />
          </DeleteButton>
        )}
      </Product>
    </div>
  );
};

export default CartItem;
