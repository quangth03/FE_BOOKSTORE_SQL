import React, { useEffect, useState } from "react";
import { Container, InfoItem, InfoItemLabel, Right, Wrapper } from "./Profile";
import ProfileLeft from "../components/ProfileLeft";
import styled from "styled-components";
import { colors, endpoint } from "../data";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { toast } from "react-toastify";

// Styled components
export const Title = styled.span`
  font-weight: bold;
  font-size: 20pt;
`;

export const FormInput = styled.input`
  flex: 5;
  border: 2px solid ${colors.color2};
  border-radius: 10px;
  font-size: 14pt;
  padding: 4px;
`;

export const Form = styled.form`
  width: 70%;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 102%;
  justify-content: flex-end;
`;

export const Button = styled.div`
  display: block;
  padding: 7px;
  background-color: ${colors.color3};
  color: white;
  border-radius: 10px;
  cursor: pointer;
`;

const ChangeProfile = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {}, [errorMessage]);

  useEffect(() => {
    // Fetch profile data
    fetch(`${endpoint}/user/profile`, {
      headers: {
        authorization: Cookies.get("authToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Hàm validate thông tin người dùng
  const validateForm = () => {
    // if (data.username.trim() === "") return "Vui lòng nhập username";
    if (data.full_name.trim() === "") return "Vui lòng nhập họ tên";
    // if (data.email.trim() === "") return "Vui lòng nhập email";
    // if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(data.email)) {
    //   return "Email không hợp lệ";
    // }
    if (data.phone_number.trim() === "") return "Vui lòng nhập số điện thoại";
    if (!/^\d{10}$/.test(data.phone_number)) {
      return "Số điện thoại không hợp lệ";
    }
    if (data.address.trim() === "") return "Vui lòng nhập địa chỉ";
    return "";
  };

  const handleUpdate = () => {
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
    } else {
      setErrorMessage(""); // Reset error message
      fetch(`${endpoint}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: Cookies.get("authToken"),
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Cập nhật thông tin thành công", { autoClose: 2000 });
            setTimeout(() => {
              navigate("/profile");
            }, 2100);
            return;
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
          <ProfileLeft index={2} />
          <Right
            style={{ alignItems: "flex-start", justifyContent: "flex-start" }}
          >
            <Title>Chỉnh sửa thông tin cá nhân</Title>
            <ErrorMessage
              errorMessage={errorMessage}
              display={errorMessage === "" ? "none" : "flex"}
            />
            <Form>
              {/* <InfoItem>
                <InfoItemLabel>Username</InfoItemLabel>
                <FormInput
                  placeholder={"Username"}
                  value={data.username || ""}
                  onChange={(e) =>
                    setData((prevData) => ({
                      ...prevData,
                      username: e.target.value,
                    }))
                  }
                />
              </InfoItem> */}
              <InfoItem>
                <InfoItemLabel>Họ tên</InfoItemLabel>
                <FormInput
                  placeholder={"Nguyễn Văn A"}
                  value={data.full_name || ""}
                  onChange={(e) =>
                    setData((prevData) => ({
                      ...prevData,
                      full_name: e.target.value,
                    }))
                  }
                />
              </InfoItem>
              <InfoItem>
                <InfoItemLabel>Số điện thoại</InfoItemLabel>
                <FormInput
                  type="tel"
                  placeholder="012345689"
                  value={data.phone_number || ""}
                  onChange={(e) =>
                    setData((prevData) => ({
                      ...prevData,
                      phone_number: e.target.value,
                    }))
                  }
                />
              </InfoItem>
              <InfoItem>
                <InfoItemLabel>Địa chỉ</InfoItemLabel>
                <FormInput
                  placeholder="1 Võ Văn Ngân, Linh Chiểu, TP Thủ Đức"
                  value={data.address || ""}
                  onChange={(e) =>
                    setData((prevData) => ({
                      ...prevData,
                      address: e.target.value,
                    }))
                  }
                />
              </InfoItem>
              <ButtonWrapper>
                <Button onClick={handleUpdate}>Cập nhật thông tin</Button>
              </ButtonWrapper>
            </Form>
          </Right>
        </Wrapper>
      </Container>
    </div>
  );
};

export default ChangeProfile;
