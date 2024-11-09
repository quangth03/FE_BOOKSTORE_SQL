import React, { useEffect, useRef, useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Container, InfoItem, InfoItemLabel, Right, Wrapper } from "./Profile";
import ProfileLeft from "../components/ProfileLeft";
import { ButtonWrapper, Button, Form, FormInput, Title } from "./ChangeProfile";
import styled from "styled-components";
import { endpoint } from "../data";
import Cookies from "js-cookie";

const Message = styled.div`
  padding: 5px 0px 0px 0px;
  width: 100%;
  color: #d06262;
  display: flex;
  align-items: center;
  display: none;
`;

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const errorMessageRef = useRef();

  useEffect(() => {
    if (errorMessage !== "") {
      errorMessageRef.current.style.display = "flex";

      if (errorMessage.indexOf("thành công") !== -1)
        errorMessageRef.current.style.color = "#37cf60";
      else errorMessageRef.current.style.color = "#d06262";
    } else errorMessageRef.current.style.display = "none";
  }, [errorMessage]);

  const handleChangePassword = () => {
    if (
      oldPassword.trim() === "" ||
      newPassword.trim === "" ||
      confirmPassword === ""
    )
      setErrorMessage("Vui lòng nhập đầy đủ thông tin");
    else if (newPassword.trim() !== confirmPassword.trim())
      setErrorMessage("Mật khẩu không khớp");
    else {
      setErrorMessage("");

      const data = {
        oldPassword: oldPassword,
        newPassword: newPassword,
      };

      fetch(`${endpoint}/auth/changepassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: Cookies.get("authToken"),
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.status === 200) {
            setErrorMessage("Đổi mật khẩu thành công");
            return response.json();
          } else {
            setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại");
          }
        })
        .catch((error) => {
          setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại");
        });
    }
  };

  return (
    <div>
      <Container>
        <Wrapper>
          <ProfileLeft index={1} />
          <Right
            style={{ alignItems: "flex-start", justifyContent: "flex-start" }}
          >
            <Title>Đổi mật khẩu</Title>
            <Message ref={errorMessageRef}>
              {errorMessage.indexOf("") === -1 ? (
                <ErrorOutlineIcon />
              ) : (
                <CheckCircleOutlineIcon />
              )}
              {` ${errorMessage}`}
            </Message>
            <Form>
              <InfoItem>
                <InfoItemLabel>Mật khẩu cũ</InfoItemLabel>
                <FormInput
                  type="password"
                  placeholder={"Mật khẩu cũ"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </InfoItem>
              <InfoItem>
                <InfoItemLabel>Mật khẩu mới</InfoItemLabel>
                <FormInput
                  type="password"
                  placeholder="Mật khẩu mới"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </InfoItem>
              <InfoItem>
                <InfoItemLabel>Nhập lại mật khẩu</InfoItemLabel>
                <FormInput
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </InfoItem>
              <ButtonWrapper>
                <Button onClick={handleChangePassword}>Đổi mật khẩu</Button>
              </ButtonWrapper>
            </Form>
          </Right>
        </Wrapper>
      </Container>
    </div>
  );
};

export default ChangePassword;
