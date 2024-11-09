import React from "react";
import styled from "styled-components";
import paymentIcon from "../assets/paymenticon.png";
import { colors } from "../data";
import { Navigate, useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: gray;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  width: 50%;
  margin: 100px 0px;
  padding: 50px 20px;
  background-color: white;
  align-items: center;
`;

const Icon = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const Title = styled.h1`
  color: ${colors.color1};
`;

const PaymentInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  margin-top: 20px;
`;

const PaymentItemTitle = styled.div`
  font-weight: ${(props) => (props.bold ? "bold" : "")};
`;

const PaymentSuccessful = () => {
  const { state } = useLocation();
  if (!state) {
    return <Navigate to={"/"} replace />;
  }
  const dateObject = new Date(state.createdAt);
  const dateString = `${dateObject.getDate()}/${
    dateObject.getMonth() + 1
  }/${dateObject.getFullYear()}`;
  return (
    <Container>
      <Wrapper>
        <Icon src={paymentIcon} />
        <Title>Thanh toán thành công</Title>
        <PaymentInfo>
          <PaymentItemTitle bold>Xin chào bạn,</PaymentItemTitle>
          <PaymentItemTitle>
            Đơn hàng của bạn đã được thanh toán thành công
          </PaymentItemTitle>

          <PaymentItemTitle bold style={{ marginTop: "10px" }}>
            Chi tiết đơn hàng:
          </PaymentItemTitle>
          <PaymentItemTitle>
            <strong>Số tiền: </strong> {Number(state.total).toLocaleString()}{" "}
            VND
          </PaymentItemTitle>
          <PaymentItemTitle>
            <strong>Ngày tạo đơn hàng: </strong> {dateString}
          </PaymentItemTitle>
        </PaymentInfo>
      </Wrapper>
    </Container>
  );
};

export default PaymentSuccessful;
