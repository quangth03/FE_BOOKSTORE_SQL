import React, { useState } from "react";
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

const AddDiscount = () => {
  const [data, setData] = useState({
    value: "",
    description: "",
    minimumOrderValue: "",
    expiredAt: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Hàm kiểm tra giá trị nhập liệu
  const handleCreateDiscount = () => {
    if (!data.value || !data.description || !data.expiredAt) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (parseFloat(data.minimumOrderValue) <= parseFloat(data.value)) {
        setErrorMessage("Đơn hàng tối thiểu phải lớn hơn giá trị giảm giá");
        return;
      }

    // Gửi yêu cầu tạo mã giảm giá
    fetch(`${endpoint}/admin/discounts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: Cookies.get("authToken"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          navigate("/admin/discounts"); // Điều hướng tới danh sách mã giảm giá
          return;
        } else {
          setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại");
        }
      })
      .catch((error) => {
        setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại");
      });
  };

  return (
    <div className="list">
      <Sidebar />

      <Right style={{ alignItems: "flex-start", justifyContent: "flex-start" }}>
        <Title>Thêm Mã Giảm Giá Mới</Title>
        <ErrorMessage
          errorMessage={errorMessage}
          display={errorMessage === "" ? "none" : "flex"}
        />

        <Form>
          <InfoItem>
            <InfoItemLabel>Giá trị giảm giá</InfoItemLabel>
            <FormInput
              type="number"
              placeholder="Giá trị giảm giá (lớn hơn 0)"
              value={data.value}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  value: e.target.value,
                }))
              }
            />
          </InfoItem>
          <InfoItem>
            <InfoItemLabel>Mô tả mã giảm giá</InfoItemLabel>
            <FormInput
              placeholder="Mô tả mã giảm giá"
              value={data.description}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  description: e.target.value,
                }))
              }
            />
          </InfoItem>
          <InfoItem>
            <InfoItemLabel>Giá trị đơn hàng tối thiểu</InfoItemLabel>
            <FormInput
              type="number"
              placeholder="Giá trị đơn hàng tối thiểu"
              value={data.minimumOrderValue}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  minimumOrderValue: e.target.value,
                }))
              }
            />
          </InfoItem>
          <InfoItem>
            <InfoItemLabel>Ngày hết hạn</InfoItemLabel>
            <FormInput
              type="date"
              value={data.expiredAt}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  expiredAt: e.target.value,
                }))
              }
            />
          </InfoItem>

          <ButtonWrapper>
            <Button onClick={handleCreateDiscount}>Thêm Mã Giảm Giá</Button>
          </ButtonWrapper>
        </Form>
      </Right>
    </div>
  );
};

export default AddDiscount;
