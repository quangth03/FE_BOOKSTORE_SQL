import React, { useEffect, useState } from "react";
import { Container, Wrapper } from "./Profile";
import styled from "styled-components";
import { colors, endpoint } from "../data";
import OrderDetailsItem from "../components/OrderDetailsItem";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { listOrderStatus } from "../datatablesource";
import Modal from "../components/Modal/Modal";

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

const QuantityWrapper = styled.div`
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
  flex: 4;
  display: flex;
  // justify-content: flex-end;
  font-weight: bold;
`;

const InfoContent = styled.div`
  flex: 6;
  display: flex;
  // justify-content: flex-end;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 3;
  cursor: pointer;

  background-color: ${colors.color1};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 10px;
  white-space: nowrap; /* Đảm bảo không xuống dòng */
  margin-top: 100px;
  margin-right: 40px;
`;

const OrderDetails = ({ orderId }) => {
  const { orderIdParam } = useParams();
  const [id, setId] = useState(orderIdParam);

  if (orderId) setId(orderId);

  const [books, setBooks] = useState([]);
  const [order, setOrder] = useState({});
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleConfirm = () => {
    fetch(`${endpoint}/user/order/update`, {
      method: "POST", // Phương thức PUT để cập nhật
      headers: {
        "Content-Type": "application/json", // Gửi dữ liệu JSON
        authorization: Cookies.get("authToken"), // Thêm token xác thực
      },
      body: JSON.stringify({ id: id, status: 7 }), // Gửi ID đơn hàng và trạng thái mới
    })
      .then((response) => {
        if (!response.ok) {
          // Nếu phản hồi không thành công, báo lỗi
          throw new Error("Failed to cancel the order");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Order cancelled successfully:", data); // Log kết quả
        setOrder((prevOrder) => ({
          ...prevOrder,
          status: 7, // Cập nhật trạng thái đơn hàng trong state để render UI, nếu không sẽ giữ trạng thái cũ và k render (tránh gọi lại api)
        }));
        closeModal(); // Đóng modal
      })
      .catch((error) => {
        console.error("Error cancelling order:", error); // Xử lý lỗi
        closeModal(); // Đóng modal ngay cả khi lỗi xảy ra
      });
  };

  useEffect(() => {
    console.log("Updated order:", order);
  }, [order]); // This will log whenever 'order' state is updated

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
        setUser(data.user);
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
          {" - "}
          Mã vận đơn: {order?.ghn_code}
        </Title>
        <Products>
          {books.map((book, index) => (
            <OrderDetailsItem key={`book-${index}`} book={book} />
          ))}
        </Products>
        <div className="flex justify-content-end">
          <InfoWrapper>
            <Info>
              <InfoLabel>Tên người mua:</InfoLabel>
              <InfoContent>{order?.ghn_info?.to_name}</InfoContent>
            </Info>
            <Info>
              <InfoLabel>Số điện thoại:</InfoLabel>
              <InfoContent>{order?.ghn_info?.to_phone}</InfoContent>
            </Info>
            <Info>
              <InfoLabel>Địa chỉ:</InfoLabel>
              <InfoContent>{order?.ghn_info?.to_address}</InfoContent>
            </Info>
          </InfoWrapper>

          <QuantityWrapper>
            <Info>
              <InfoLabel>Tổng số sản phẩm:</InfoLabel>
              <InfoContent>{order.total_quantity}</InfoContent>
            </Info>
            <Info>
              <InfoLabel>Trạng thái đơn hàng:</InfoLabel>
              <InfoContent>
                {listOrderStatus.find((item) => item.id == order.status)?.name}
              </InfoContent>
            </Info>

            {order.discount > 0 ? (
              <>
                <Info>
                  <InfoLabel>Tổng tiền các sản phẩm:</InfoLabel>
                  <InfoContent>
                    {Number(order.total + order.discount).toLocaleString()} VND
                  </InfoContent>
                </Info>
                <Info>
                  <InfoLabel>Giảm giá:</InfoLabel>
                  <InfoContent>
                    {Number(order.discount).toLocaleString()} VND
                  </InfoContent>
                </Info>
              </>
            ) : (
              <></>
            )}

            <Info style={{ fontSize: "24px", color: "red" }}>
              <InfoLabel>Tổng thanh toán:</InfoLabel>
              <InfoContent>
                {Number(order.total).toLocaleString()} VND
              </InfoContent>
            </Info>
          </QuantityWrapper>
          {!Cookies.get("isAdmin") ? (
            <div>
              {order.status == 1 || order.status == 2 ? (
                <Button onClick={openModal}>Hủy đơn hàng</Button>
              ) : (
                <>
                  <Button
                    onClick={() =>
                      window.open(
                        `https://tracking.ghn.dev/?order_code=${order?.ghn_code}`,
                        "_blank"
                      )
                    }
                  >
                    Tra cứu
                  </Button>
                </>
              )}{" "}
            </div>
          ) : (
            <></>
          )}
        </div>
      </Wrapper>
      <Modal
        isOpen={isModalOpen}
        title="Hủy đơn hàng" // nếu hủy thì khôi phục lại số lượng sách và hủy luôn trên ghn, thêm nút tra cứu
        onConfirm={handleConfirm}
        onCancel={closeModal}
      />
    </Container>
  );
};

export default OrderDetails;
