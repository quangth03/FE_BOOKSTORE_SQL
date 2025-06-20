import React from "react";
import styled from "styled-components";
import { colors } from "../data";
import CustomNavLink from "./CustomNavLink";

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  justify-content: flex-end;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const PageNumberItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  padding: 10px;
  width: 40px;
  margin: 5px;
  background-color: ${(props) =>
    props.active ? colors.color2 : colors.color1};
  color: white;
`;

const PageNavigation = ({
  current = 1, // neu ben kia khong truyen vao moi dung mac dinh la 1
  total = 10,
  urlPattern,
  padding = "0px 75px",
}) => {
  var min = current - 2 > 0 ? current - 2 : 1;
  var max = current + 2 >= total ? total : current + 1;

  var pageNumberItems = [];
  for (let index = min; index <= max; index++) {
    pageNumberItems.push(
      <CustomNavLink
        to={`${urlPattern}?page=${index}`}
        key={`page-navigation-${index}`}
      >
        <PageNumberItem active={current === index}>{index}</PageNumberItem>
      </CustomNavLink>
    );
  }
  return (
    <Container style={{ padding: `${padding}` }}>
      <Wrapper>{pageNumberItems}</Wrapper>
    </Container>
  );
};

export default PageNavigation;
