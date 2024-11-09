import React, { useEffect, useState } from "react";
import { InfoItem, InfoItemLabel, Right } from "../../Profile";
import Sidebar from "../../../components/sidebar/Sidebar";
import styled from "styled-components";
import { colors, endpoint } from "../../../data";
import ErrorMessage from "../../../components/ErrorMessage";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

export const Title = styled.span`
  font-weight: bold;
  font-size: 20pt;
  margin-bottom: 30px;
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
const AddCategory = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {}, [errorMessage]);

  const handleCreateCategory = () => {
    fetch(`${endpoint}/admin/categories/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: Cookies.get("authToken"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          navigate("/admin/categories");
          return;
        } else setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại");
      })
      .catch((error) => {
        setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại");
      });
  };

  return (
    <div className="list">
      <Sidebar />

      <Right style={{ alignItems: "flex-start", justifyContent: "flex-start" }}>
        <Title>Thêm Thể loại Mới</Title>
        <ErrorMessage
          errorMessage={errorMessage}
          display={errorMessage === "" ? "none" : "flex"}
        />

        <Form>
          <InfoItem>
            <InfoItemLabel>Đường dẫn hình ảnh</InfoItemLabel>
            <FormInput
              placeholder="http://"
              value={data.image}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  image: e.target.value,
                }))
              }
            />
          </InfoItem>
          <InfoItem>
            <InfoItemLabel>Tên thể loại</InfoItemLabel>
            <FormInput
              placeholder={"Thể loại"}
              value={data.name}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  name: e.target.value,
                }))
              }
            />
          </InfoItem>
          <InfoItem>
            <InfoItemLabel>Mô tả</InfoItemLabel>
            <FormInput
              placeholder={"Thể loại hay"}
              value={data.description}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  description: e.target.value,
                }))
              }
            />
          </InfoItem>
          <ButtonWrapper>
            <Button onClick={handleCreateCategory}>Thêm thể loại</Button>
          </ButtonWrapper>
        </Form>
      </Right>
    </div>
  );
};

export default AddCategory;
