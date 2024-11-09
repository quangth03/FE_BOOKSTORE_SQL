import React from "react";
import logo from "../assets/icon.png";
import styled from "styled-components";

const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Icon = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.5);
`;

const Logo = () => {
  return (
    <IconWrapper>
      <Icon src={logo} />
    </IconWrapper>
  );
};

export default Logo;
