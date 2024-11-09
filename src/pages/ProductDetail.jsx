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

const Amount = styled.span`
  width: 30px;
  height: 30px;

  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
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
            <HR />
            <Price>{Number(book.price).toLocaleString()} VND</Price>
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
                  <Amount>{amount}</Amount>
                  <AmountButton onClick={() => setAmount(amount + 1)}>
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
