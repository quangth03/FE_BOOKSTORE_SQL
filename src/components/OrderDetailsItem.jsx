import React from "react";
import styled from "styled-components";
import CustomNavLink from "./CustomNavLink";

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

const OrderDetailsItem = ({ book }) => {
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
      </ProductDetail>
    </Product>
  );
};

export default OrderDetailsItem;
