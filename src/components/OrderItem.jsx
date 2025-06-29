import React from "react";
import styled from "styled-components";
import { colors, endpoint } from "../data";
import { useNavigate } from "react-router-dom";
import { listOrderStatus } from "../datatablesource";
import { getColor } from "../datatablesource";
import Cookies from "js-cookie";

const Container = styled.div`
  width: 100%;
  margin: 10px 0px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`;

const OrderItemId = styled.div`
  width: 100%;
  border-bottom: 1px solid ${colors.color1};
  font-weight: bold;
  color: ${colors.color1};
  padding: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const OrderItemInfo = styled.div`
  display: flex;
  flex: 7;
  flex-direction: column;
  padding: 10px 5px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
`;

const InfoItemLabel = styled.span`
  font-weight: bold;
  flex: 2;
`;

const InfoItemContent = styled.span`
  flex: 4;
`;

const DetailsButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 3;
  flex-direction: column;
`;

const DetailsButton = styled.button`
  border: 1px solid ${colors.color1};
  width: 100px;
  height: 30px;
  border-radius: 20px;
  margin: 10px 0px;

  &:hover {
    background-color: ${colors.color1};
    color: white;
  }
`;

const OrderItem = ({ data }) => {
  const dateObject = new Date(data.createdAt);
  const dateString = `${dateObject.getDate()}/${
    dateObject.getMonth() + 1
  }/${dateObject.getFullYear()}`;

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/orders/${data.id}`);
  };
  const handlePay = () => {
    window.location.href = data.pay_url;
  };
  const statusColor = getColor(data.status);

  return (
    <Container>
      <OrderItemId>
        Mã đơn hàng: <span style={{ color: "black" }}>{data.id}</span>
      </OrderItemId>
      <Wrapper>
        <OrderItemInfo>
          <InfoItem>
            <InfoItemLabel>Tổng số lượng sản phẩm</InfoItemLabel>
            <InfoItemContent>{data.total_quantity}</InfoItemContent>
          </InfoItem>
          <InfoItem>
            <InfoItemLabel>Trạng thái đơn hàng</InfoItemLabel>
            <InfoItemContent style={{ color: statusColor }}>
              {listOrderStatus.find((item) => item.id == data.status)?.name}
            </InfoItemContent>
          </InfoItem>
          <InfoItem>
            <InfoItemLabel>Ngày đặt hàng</InfoItemLabel>
            <InfoItemContent>{dateString}</InfoItemContent>
          </InfoItem>
          <InfoItem>
            <InfoItemLabel>Tổng số tiền thanh toán</InfoItemLabel>
            <InfoItemContent>
              {Number(data.total + data.ghn_fee).toLocaleString()} VND
            </InfoItemContent>
          </InfoItem>
          <InfoItem>
            <InfoItemLabel>Hình thức thanh toán</InfoItemLabel>
            <InfoItemContent>
              {data.payment_method == "cash"
                ? "Thanh toán khi nhận hàng"
                : "Ví Momo"}
            </InfoItemContent>
          </InfoItem>
        </OrderItemInfo>
        <DetailsButtonWrapper>
          {data.status === 1 ? (
            <DetailsButton onClick={handlePay}>Thanh toán</DetailsButton>
          ) : null}
          <DetailsButton onClick={handleNavigate}>Xem chi tiết</DetailsButton>
        </DetailsButtonWrapper>
      </Wrapper>
    </Container>
  );
};

export default OrderItem;
