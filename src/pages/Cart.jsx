import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors, endpoint } from "../data";
import CustomNavLink from "../components/CustomNavLink";
import CartItem from "../components/CartItem";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export const Info = styled.div`
  flex: 5;
  border-right: 3px solid gray;
`;

export const Products = styled.div`
  padding-right: 10px;
`;

export const Total = styled.div`
  flex: 2;
  padding: 20px;
  height: 50vh;
`;

export const TotalTitle = styled.h1`
  font-size: 25px;
`;

export const TotalItem = styled.div`
  margin: 30px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "25px"};
`;

export const TotalText = styled.span``;

export const TotalPrice = styled.span``;

export const TotalPrices = styled.span`
  color: red;
`;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [numberOfBooks, setNumberOfBooks] = useState(0);
  // const [discounts, setDiscounts] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  // const [paymentMethod, setPaymentMethod] = useState("cash");
  const navigate = useNavigate();

  useEffect(() => {
    handleGetCart();
    // handleGetDiscounts();
  }, []);

  const handleGetCart = () => {
    fetch(`${endpoint}/user/cart`, {
      headers: {
        authorization: Cookies.get("authToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const sortedBooks = data.books.sort(
          (a, b) =>
            new Date(b.cart_details.createdAt) -
            new Date(a.cart_details.createdAt)
        );

        setCartItems(sortedBooks);
        setNumberOfBooks(sortedBooks.length);
        setTotalAmount(data.total);
        console.log("Total amount:", data);
      })
      .catch((error) => console.error(error));
  };

  // const handleGetDiscounts = () => {
  //   fetch(`${endpoint}/user/discounts/valid`, {
  //     headers: {
  //       authorization: Cookies.get("authToken"),
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (Array.isArray(data)) {
  //         setDiscounts(data);
  //       } else {
  //         console.error("Dữ liệu mã giảm giá không hợp lệ");
  //       }
  //     })
  //     .catch((error) => console.error(error));
  // };

  const updateCart = () => {
    handleGetCart();
  };

  const handleCheckout = () => {
    let isValid = true;

    for (let cartItem of cartItems) {
      if (cartItem.cart_details.quantity > cartItem.quantity) {
        isValid = false;
        toast.error(
          `Số lượng của sản phẩm "${cartItem.title}" không đủ để đặt hàng.`,
          { autoClose: 2000 }
        );
      }
    }

    if (isValid && cartItems.length > 0) {
      navigate("/shipping");
    }
  };

  const isVip = Cookies.get("isVip");

  const discountedProduct = cartItems.reduce((total, item) => {
    const discountRate = isVip ? item.discount * 2 : item.discount;
    const itemDiscount =
      (item.price * discountRate * item.cart_details.quantity) / 100;
    return total + itemDiscount;
  }, 0);

  const priceProduct = cartItems.reduce((total, item) => {
    const itemPrice = item.price * item.cart_details.quantity;
    return total + itemPrice;
  }, 0);

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
              ĐẶT HÀNG
            </TopButton>
            {/* <ToastContainer /> */}
            <div style={{ width: "10px" }}></div>
          </Top>
          <Bottom>
            <Info>
              <Products>
                {cartItems
                  ? cartItems.map((cartItem, index) => {
                      return (
                        <CartItem
                          cartItem={cartItem}
                          key={`cart-item-${index}`}
                          updateCart={updateCart}
                        />
                      );
                    })
                  : ""}
              </Products>
            </Info>
            <Total>
              <TotalTitle>THÔNG TIN ĐƠN HÀNG</TotalTitle>
              <TotalItem>
                <TotalText>Tổng tiền các sản phẩm</TotalText>
                <TotalPrice>
                  {/* {Number(totalAmount).toLocaleString()} VND */}
                  {Number(priceProduct).toLocaleString()} VND
                </TotalPrice>
              </TotalItem>
              <TotalItem>
                <TotalText>Giảm giá sản phẩm</TotalText>
                <TotalPrice>
                  -{Number(parseInt(discountedProduct)).toLocaleString()} VND
                </TotalPrice>
              </TotalItem>
              <hr />
              {/* <TotalItem>
                <TotalText>Tiết kiệm</TotalText>
                <TotalPrice>
                  {Number(parseInt(discountedProduct)).toLocaleString()} VND
                </TotalPrice>
              </TotalItem>
              <hr /> */}
              <TotalItem type="total">
                <TotalText>Tổng thanh toán</TotalText>
                <TotalPrices>
                  {selectedDiscount &&
                  totalAmount >= selectedDiscount.minimumOrderValue
                    ? Number(
                        totalAmount - selectedDiscount.value
                      ).toLocaleString()
                    : Number(totalAmount).toLocaleString()}{" "}
                  VND
                </TotalPrices>
              </TotalItem>
            </Total>
          </Bottom>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Cart;
