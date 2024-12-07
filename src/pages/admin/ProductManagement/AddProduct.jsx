import React, { useEffect, useState } from "react";
import { InfoItem, InfoItemLabel, Right } from "../../Profile";
import Sidebar from "../../../components/sidebar/Sidebar";
import styled from "styled-components";
import { colors, endpoint } from "../../../data";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import ErrorMessage from "../../../components/ErrorMessage";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

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
const AddProduct = () => {
  const [data, setData] = useState({
    discount: 0,
  });
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {}, [errorMessage]);

  const validateInput = () => {
    const currentDate = new Date().toISOString().split("T")[0];

    if (
      !data.title ||
      !data.author ||
      !data.price ||
      !data.quantity ||
      !data.image ||
      !data.description ||
      !data.publication_date ||
      !data.discount
    ) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin.");
      return false;
    }

    if (isNaN(data.quantity) || data.quantity <= 0) {
      setErrorMessage("Số lượng phải là số lớn hơn 0.");
      return false;
    }

    if (isNaN(data.price) || data.price <= 0) {
      setErrorMessage("Giá tiền phải là số lớn hơn 0.");
      return false;
    }

    if (isNaN(data.discount) || data.discount < 0 || data.discount >= 100) {
      setErrorMessage("Khuyến mãi phải là số từ 0 đến dưới 100 (%)");
      return false;
    }

    if (data.publication_date >= currentDate) {
      setErrorMessage("Ngày xuất bản phải trước ngày hiện tại.");
      return false;
    }

    setErrorMessage(""); // Xóa lỗi nếu tất cả hợp lệ
    return true;
  };

  const handleCreateBook = () => {
    if (!validateInput()) {
      return;
    }

    // Tiến hành gửi dữ liệu
    fetch(`${endpoint}/admin/books/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: Cookies.get("authToken"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Thêm sản phẩm thành công", {
            autoClose: 2000,
          });
          setTimeout(() => {
            navigate("/admin/books");
          }, 2100);
        } else {
          setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại.");
        }
      })
      .catch(() => {
        setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại.");
      });
  };

  return (
    <div className="list">
      <Sidebar />
      <Right style={{ alignItems: "flex-start", justifyContent: "flex-start" }}>
        <Title>Thêm Sản Phẩm Mới</Title>
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
            <InfoItemLabel>Tiêu đề</InfoItemLabel>
            <FormInput
              placeholder={"Cuốn sách"}
              value={data.title}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  title: e.target.value,
                }))
              }
            />
          </InfoItem>
          <InfoItem>
            <InfoItemLabel>Tác giả</InfoItemLabel>
            <FormInput
              placeholder={"Nguyễn Văn A"}
              value={data.author}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  author: e.target.value,
                }))
              }
            />
          </InfoItem>
          <InfoItem>
            <InfoItemLabel>Số lượng</InfoItemLabel>
            <FormInput
              placeholder={"1"}
              value={data.quantity}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  quantity: e.target.value,
                }))
              }
            />
          </InfoItem>
          <InfoItem>
            <InfoItemLabel>Giá tiền</InfoItemLabel>
            <FormInput
              placeholder="VNĐ"
              value={data.price}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  price: e.target.value,
                }))
              }
            />
          </InfoItem>
          <InfoItem>
            <InfoItemLabel>Khuyến mãi</InfoItemLabel>
            <FormInput
              placeholder="%"
              value={data.discount}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  discount: e.target.value,
                }))
              }
            />
          </InfoItem>
          <InfoItem>
            <InfoItemLabel>Mô tả</InfoItemLabel>
            <FormInput
              placeholder="Cuốn sách hay"
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
            <InfoItemLabel>Ngày xuất bản</InfoItemLabel>
            <FormInput
              type="date"
              value={data.publication_date}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  publication_date: e.target.value,
                }))
              }
            />
          </InfoItem>
          <ButtonWrapper>
            <Button onClick={handleCreateBook}>Thêm sản phẩm</Button>
          </ButtonWrapper>
        </Form>
      </Right>
    </div>
  );
};

export default AddProduct;
