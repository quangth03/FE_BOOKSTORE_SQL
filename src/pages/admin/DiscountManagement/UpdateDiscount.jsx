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

const UpdateDiscount = () => {
  const [data, setData] = useState({
    value: "",
    description: "",
    minimumOrderValue: 0,
    expiredAt: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const [errorMessage, setErrorMessage] = useState("");

  // Lấy dữ liệu mã giảm giá hiện tại
  useEffect(() => {
    fetch(`${endpoint}/admin/discounts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const formattedDate = new Date(data.expiredAt).toISOString().split('T')[0];
        setData({
          ...data,
          expiredAt: formattedDate,
        });
      })
      .catch((error) => console.error(error));
  }, [id]);

  // Cập nhật thông tin mã giảm giá
  const handleUpdateDiscount = () => {
    // Kiểm tra dữ liệu nhập vào
    if (!data.value || !data.description || !data.expiredAt) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (isNaN(data.value) || data.value <= 0) {
      setErrorMessage("Giá trị giảm giá phải lơn hơn 0.");
      return ;
    }

    if (data.minimumOrderValue <= data.value) {
      setErrorMessage("Đơn hàng tối thiểu phải lớn hơn giá trị giảm giá");
      return;
    }
    
    const today = new Date();
      const expiredDate = new Date(data.expiredAt);
      if (expiredDate <= today) {
        setErrorMessage("Ngày hết hạn phải sau ngày hôm nay.");
        return;
      }


    // Gửi yêu cầu cập nhật mã giảm giá
    fetch(`${endpoint}/admin/discounts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: Cookies.get("authToken"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          navigate("/admin/discounts"); // Điều hướng tới danh sách mã giảm giá
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
        <Title>Chỉnh Sửa Thông Tin Mã Giảm Giá</Title>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
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
            <Button onClick={handleUpdateDiscount}>Cập nhật thông tin</Button>
          </ButtonWrapper>
        </Form>
      </Right>
    </div>
  );
};

export default UpdateDiscount;
