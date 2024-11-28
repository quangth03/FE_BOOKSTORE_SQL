import React from "react";
import styled from "styled-components";
import CustomNavLink from "./CustomNavLink";
import { colors, endpoint } from "../data";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Product = styled.div`
  padding: 10px 20px;
  border: 1px solid #eee;
  border-radius: 50px;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  flex: 2;
`;

const ProductDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const Image = styled.img`
  height: 155px;
  flex: 1;
  border-radius: 30px;
`;

const ProductName = styled.span`
  font-size: 20px;
  width: 200px;
  flex: 4;
  display: flex;
  padding: 5px;
`;

const Price = styled.p`
  font-size: 20px;
  flex: 2;
  display: flex;
  justify-content: center;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  margin-bottom: 10px;
  flex: 1;
  justify-content: center;
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
const Button = styled.button`
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
const OrderDetailsItem = ({ book }) => {
  // const { id } = useParams();
  const navigate = useNavigate();
  const data = {
    book_id: Number(book.id),
    quantity: 1,
  };

  const reBuyHandle = () => {
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
    // toast.success("Thêm vào giỏ hàng thành công");
  };
  const handleReBuyAndNavigate = async () => {
    reBuyHandle(); // Thực hiện hàm
    setTimeout(() => navigate("/cart"), 250);
  };

  return (
    <Product>
      <ProductDetail>
        <Image src={book.image} style={{ marginRight: "10px" }} />
        <ProductName>
          <CustomNavLink to={`/books/${book.id}`}>{book.title}</CustomNavLink>
        </ProductName>
        <AmountContainer>
          <Amount>{book.order_detail.quantity}</Amount>
        </AmountContainer>
        <Price>{Number(book.order_detail.total).toLocaleString()} VND</Price>
        {Cookies.get("isAdmin") ? (
          <></>
        ) : (
          <Button
            onClick={() => {
              handleReBuyAndNavigate();
            }}
          >
            Mua lại
          </Button>
        )}
      </ProductDetail>
    </Product>
  );
};

export default OrderDetailsItem;
