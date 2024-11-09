import React, { useState, useEffect } from "react";
import { InfoItem, InfoItemLabel, Right } from "../../Profile";
import Sidebar from "../../../components/sidebar/Sidebar";
import styled from "styled-components";
import { colors, endpoint } from "../../../data";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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
const UpdateCategory = () => {
  const [data, setData] = useState({});

  
  const navigate = useNavigate();

  const { id } = useParams();

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => { }, [errorMessage]);

  useEffect(() => {
    fetch(`${endpoint}/admin/categories/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data[0]);
        
      })
      .catch((error) => console.error(error));
  }, [id]);
  
    const handleUpdateCategory = () => {
      fetch(`${endpoint}/admin/categories/${id}`, {
        method: "PUT",
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
          }
        })
        .catch((error) => {
          setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại");
        });
    };

  return (
    <div className="list">
      <Sidebar />

      <Right
        style={{ alignItems: "flex-start", justifyContent: "flex-start" }}
      >
        <Title>Chỉnh Sửa Thông Tin Thể loại</Title>
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
            <Button
             onClick={handleUpdateCategory}
            >
              Cập nhật thông tin
            </Button>
          </ButtonWrapper>
        </Form>
      </Right>
    </div>
  );
};

export default UpdateCategory;
