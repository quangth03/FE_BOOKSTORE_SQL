import styled from "styled-components";
import React, { useEffect, useState } from "react";
import TabProductDetail from "../components/TabProductDetail";
import { colors, endpoint } from "../data";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 75px;
`;

const Author = styled.p`
  font-size: 40px;
  padding: 10px 0px;
`;

const Quantity = styled.p`
  font-size: 20px;
  padding: 10px 0px;
  color: #cd4949;
`;

const Price = styled.p`
  font-weight: 200;
  font-size: 30px;
  padding: 10px 0px;
  color: ${colors.color1};
`;

const HR = styled.hr``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  padding: 20px 0px;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  justify-content: space-between;
`;

const AmountButton = styled.button`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border: 2px solid ${colors.color1};
  background-color: white;
  font-weight: bold;
  font-size: 15pt;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${colors.color1};
    color: white;
  }
`;

const Amount = styled.input.attrs({ type: "number" })`
  width: 30px;
  height: 30px;
  border: none;
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

const AddButton = styled.button`
  padding: 10px;
  border: 2px solid ${colors.color2};
  background-color: white;
  cursor: pointer;
  font-size: 20px;
  border-radius: 10px;

  &:hover {
    background-color: ${colors.color2};
    color: white;
  }
`;

const ProductDetail = () => {
  const [amount, setAmount] = useState(1);
  const [book, setBook] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`${endpoint}/user/books/id/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
        console.log("data", data);
        console.log("book", book);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const data = {
    book_id: Number(id),
    quantity: amount,
  };

  const handleAddToCart = () => {
    fetch(`${endpoint}/user/cart`, {
      method: "POST",
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

  const handleChange = (e) => {
    const newValue = e.target.value;
    const min = 1;
    const max = 100;

    if (newValue === "") {
      setAmount("");
    } else if (parseInt(newValue) < min) {
      setAmount(min);
    } else if (parseInt(newValue) > max) {
      setAmount(max);
    } else {
      setAmount(newValue);
    }
  };

  const calculatePrice = (price, discount) => {
    return Math.round(price * (1 - discount / 100));
  };
  const sellPrice = calculatePrice(book.price, book.discount);

  return (
    <div>
      <Container>
        <Wrapper>
          <ImgContainer>
            <Image
              src={
                book.image ||
                "https://www.bookgeeks.in/wp-content/uploads/2022/11/The-Art-of-War-by-Sun-Tzu.jpg"
              }
            />
          </ImgContainer>
          <InfoContainer>
            <Title>{book.title}</Title>
            <Author>{book.author}</Author>
            <Quantity>Số lượng: {book.quantity}</Quantity>
            <HR />
            <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
              <Price>{Number(sellPrice).toLocaleString()} VND</Price>
              {book.discount > 0 && (
                <del style={{ fontSize: "22px" }}>
                  {Number(book.price).toLocaleString()} VND
                </del>
              )}
            </div>
            <HR />
            {Cookies.get("isAdmin") ? (
              ""
            ) : (
              <AddContainer>
                <AmountContainer>
                  <AmountButton
                    onClick={() => (amount > 1 ? setAmount(amount - 1) : 1)}
                  >
                    -
                  </AmountButton>
                  <Amount value={amount} onChange={handleChange}></Amount>

                  <AmountButton
                    onClick={() =>
                      setAmount(amount < book.quantity ? amount + 1 : amount)
                    }
                  >
                    +
                  </AmountButton>
                </AmountContainer>
                <AddButton onClick={handleAddToCart}>
                  THÊM VÀO GIỎ HÀNG
                </AddButton>
              </AddContainer>
            )}
            <TabProductDetail book={book} />
          </InfoContainer>
        </Wrapper>
      </Container>
    </div>
  );
};

export default ProductDetail;
