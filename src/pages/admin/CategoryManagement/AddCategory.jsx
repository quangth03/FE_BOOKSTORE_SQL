import React, { useEffect, useState } from "react";
import { InfoItem, InfoItemLabel, Right } from "../../Profile";
import Sidebar from "../../../components/sidebar/Sidebar";
import styled from "styled-components";
import { colors, endpoint } from "../../../data";
import ErrorMessage from "../../../components/ErrorMessage";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

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
  const [imageUrl, setImageUrl] = useState(null); // State để lưu URL của hình ảnh

  useEffect(() => {}, [errorMessage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData((prevData) => ({
      ...prevData,
      image: file,
    }));

    // Tạo URL hình ảnh tạm thời
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl); // Cập nhật state để hiển thị ảnh
  };

  const handleCreateCategory = async () => {
    if (!data.image || !data.name || !data.description) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const formData = new FormData();
    formData.append("image", data.image); // Thêm hình ảnh vào FormData

    try {
      const imageResponse = await fetch(`${endpoint}/admin/upload`, {
        method: "POST",
        headers: {
          authorization: Cookies.get("authToken"),
        },
        body: formData,
      });

      if (!imageResponse.ok) {
        setErrorMessage("Đã có lỗi khi tải hình ảnh.");
        return;
      }

      const imageData = await imageResponse.json();
      console.log("imageData", imageData);
      const imageUrl = imageData.imageUrl; // Giả sử server trả về URL hình ảnh
      const categoryData = {
        name: data.name,
        description: data.description,
        image: imageUrl, // Sử dụng link hình ảnh đã upload
      };

      const categoryResponse = await fetch(`${endpoint}/admin/categories/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: Cookies.get("authToken"),
        },
        body: JSON.stringify(categoryData),
      });
      if (categoryResponse.status === 200) {
        toast.success("Thêm thể loại thành công", {
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/admin/categories");
        }, 2100);
      } else setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại");
    } catch (error) {
      setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
    setErrorMessage("");
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
            <InfoItemLabel>Chọn Hình Ảnh</InfoItemLabel>
            <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
              <Button style={{ marginRight: "595px" }}>Chọn hình ảnh</Button>
            </label>
            <FormInput
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }} // Ẩn input file mặc định
            />
          </InfoItem>
          {imageUrl && (
            <div style={{ marginLeft: "290px" }}>
              <img
                src={imageUrl}
                alt="Hình ảnh sản phẩm"
                style={{ width: "150px", height: "200px" }}
              />
            </div>
          )}
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
