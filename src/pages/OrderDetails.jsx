import React, { useEffect, useState } from "react";
import { Container, Wrapper } from "./Profile";
import styled from "styled-components";
import { colors, endpoint } from "../data";
import OrderDetailsItem from "../components/OrderDetailsItem";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const Title = styled.div`
  width: 100%;
  font-weight: bold;
  padding-bottom: 5px;
  font-size: 16pt;
  border-bottom: 2px solid ${colors.color1};
`;

const Products = styled.div`
  width: 100%;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid gray;
  margin-top: 15px;
  padding: 0px 40px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0px;
`;

const InfoLabel = styled.div`
  flex: 8;
  display: flex;
  justify-content: flex-end;
  font-weight: bold;
`;

const InfoContent = styled.div`
  flex: 2;
  display: flex;
  justify-content: flex-end;
`;
const OrderDetails = ({ orderId }) => {
  const { orderIdParam } = useParams();
  const [id, setId] = useState(orderIdParam);

  if (orderId) setId(orderId);

  const [books, setBooks] = useState([]);
  const [order, setOrder] = useState({});

  useEffect(() => {
    fetch(`${endpoint}/user/order/${id}`, {
      headers: {
        authorization: Cookies.get("authToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrder(data);
        setBooks(data.books);
      })
      .catch((error) => console.error(error));
  }, [id]);

  var dateString = "27/04/2023";
  if (order.createdAt) {
    const dateObject = new Date(order.createdAt);
    dateString = `${dateObject.getDate()}/${
      dateObject.getMonth() + 1
    }/${dateObject.getFullYear()}`;
  }

  return (
    <Container>
      <Wrapper style={{ flexDirection: "column" }}>
        <Title>
          Đơn hàng {order.id} {`(${dateString})`}
        </Title>
        <Products>
          {books.map((book, index) => (
            <OrderDetailsItem key={`book-${index}`} book={book} />
          ))}
        </Products>
        <InfoWrapper>
          <Info>
            <InfoLabel>Tổng số sản phẩm:</InfoLabel>
            <InfoContent>{order.total_quantity}</InfoContent>
          </Info>
          <Info>
            <InfoLabel>Tổng số tiền thanh toán:</InfoLabel>
            <InfoContent>
              {Number(order.total).toLocaleString()} VND
            </InfoContent>
          </Info>
        </InfoWrapper>
      </Wrapper>
    </Container>
  );
};

export default OrderDetails;
