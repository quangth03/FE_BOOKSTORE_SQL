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
  align-items: center;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "25px"};
`;

const TotalText = styled.span``;

const TotalPrice = styled.span``;

const DiscountSelect = styled.select`
  width: 70%;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
`;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [numberOfBooks, setNumberOfBooks] = useState(0);
  const [discounts, setDiscounts] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const navigate = useNavigate();

  useEffect(() => {
    handleGetCart();
    handleGetDiscounts();
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
      })
      .catch((error) => console.error(error));
  };

  const handleGetDiscounts = () => {
    fetch(`${endpoint}/user/discounts/valid`, {
      headers: {
        authorization: Cookies.get("authToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDiscounts(data);
        } else {
          console.error("Dữ liệu mã giảm giá không hợp lệ");
        }
      })
      .catch((error) => console.error(error));
  };

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
      const orderData = {
        value: selectedDiscount?.value ?? 0,
        payment_method: paymentMethod, // Phương thức thanh toán
        status: paymentMethod === "online" ? 1 : 2, // Trạng thái đơn hàng
      };

      fetch(`${endpoint}/user/order`, {
        method: "POST",
        headers: {
          authorization: Cookies.get("authToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
        .then((response) => {
          if (response.status === 200) return response.json();
        })
        .then((data) => {
          if (paymentMethod === "online") {
            window.location.href = data.payUrl; // Chuyển hướng nếu là thanh toán online
          } else {
            toast.success("Đặt hàng thành công!", { autoClose: 2000 });
            setTimeout(() => {
              navigate("/orders");
            }, 2100);
          }
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
              ĐẶT HÀNG
            </TopButton>
            {/* <ToastContainer /> */}
            <div style={{ width: "10px" }}></div>
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
              <TotalTitle>THÔNG TIN ĐƠN HÀNG</TotalTitle>
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
              <TotalItem>
                <TotalText>Chọn mã giảm giá</TotalText>
                <DiscountSelect
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    // Kiểm tra nếu không phải "null" thì mới parse
                    if (selectedValue !== "null") {
                      setSelectedDiscount(JSON.parse(selectedValue));
                    } else {
                      setSelectedDiscount(null); // Đặt lại selectedDiscount nếu chọn "Chọn mã giảm giá"
                    }
                  }}
                >
                  <option value="null">Chọn mã giảm giá</option>
                  {discounts.map((discount) => {
                    const isDisabled = totalAmount < discount.minimumOrderValue; // Kiểm tra điều kiện disable
                    return (
                      <option
                        key={discount.id}
                        value={JSON.stringify(discount)}
                        disabled={isDisabled} // Disable nếu không đủ giá trị đơn hàng
                      >
                        {discount.description} -{" "}
                        {Number(discount.value).toLocaleString()}{" "}
                        {isDisabled && "(Không áp dụng)"}
                      </option>
                    );
                  })}
                </DiscountSelect>
              </TotalItem>
              <TotalItem>
                <TotalText>Thanh toán bằng</TotalText>
                <DiscountSelect
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="cash">Tiền mặt</option>
                  <option value="online">Online</option>
                </DiscountSelect>
              </TotalItem>
              {/* <TotalItem type="total">
                <TotalText>Tổng cộng</TotalText>
                <TotalPrice>
                  {Number(totalAmount).toLocaleString()} VND
                </TotalPrice>
              </TotalItem> */}
              <TotalItem type="total">
                <TotalText>Tổng thanh toán</TotalText>
                <TotalPrice>
                  {selectedDiscount &&
                  totalAmount >= selectedDiscount.minimumOrderValue
                    ? Number(
                        totalAmount - selectedDiscount.value
                      ).toLocaleString()
                    : Number(totalAmount).toLocaleString()}{" "}
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
