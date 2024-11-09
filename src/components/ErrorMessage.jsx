import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import styled from "styled-components";

const Message = styled.div`
  padding: 5px 0px 0px 0px;
  width: 100%;
  color: #d06262;
  display: flex;
  align-items: center;
  display: ${(props) => props.display || "none"};
`;

const ErrorMessage = ({ errorMessage, display }) => {
  return (
    <Message display={display}>
      <ErrorOutlineIcon />
      {` ${errorMessage}`}
    </Message>
  );
};

export default ErrorMessage;
