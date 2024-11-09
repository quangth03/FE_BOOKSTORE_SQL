import React, { useEffect, useState } from "react";
import { Container, Right, Wrapper as ParentWrapper } from "./Profile";
import { Title } from "./ChangeProfile";
import ProfileLeft from "../components/ProfileLeft";
import styled from "styled-components";
import { endpoint } from "../data";
import OrderItem from "../components/OrderItem";
import Cookies from "js-cookie";

const Orders = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch(`${endpoint}/user/order`, {
      headers: {
        authorization: Cookies.get("authToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <Container>
      <ParentWrapper>
        <ProfileLeft index={3} />
        <Right
          style={{ alignItems: "flex-start", justifyContent: "flex-start" }}
        >
          <Title>Đơn hàng của bạn</Title>
          <Orders>
            {orders.map((orderItem, index) => {
              return <OrderItem key={`order-item-${index}`} data={orderItem} />;
            })}
          </Orders>
        </Right>
      </ParentWrapper>
    </Container>
  );
};

export default UserOrders;
