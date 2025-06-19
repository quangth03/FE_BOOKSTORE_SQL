import React, { useState } from "react";
import { InfoItem, InfoItemLabel, Right } from "../../Profile";
import Sidebar from "../../../components/sidebar/Sidebar";
import styled from "styled-components";
import { colors, endpoint } from "../../../data";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import ErrorMessage from "../../../components/ErrorMessage";
import { toast } from "react-toastify";
import axios from "axios";

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

  /* Riêng textarea thì tăng chiều cao */
  textarea& {
    height: 100px;
    resize: vertical; /* Cho phép thay đổi chiều cao nếu muốn */
  }
`;

export const Form = styled.form`
  width: 70%;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 101%;
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
    title: "",
    author: "",
    price: "",
    quantity: "",
    discount: 0,
    description: "",
    publication_date: "",
    image: null,
  });
  const [imageUrl, setImageUrl] = useState(null); // State để lưu URL của hình ảnh
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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

  const handleCreateBook = async () => {
    if (!validateInput()) {
      return;
    }
    // Upload hình ảnh lên server để lấy URL
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
      // Sau khi có link hình ảnh, tiến hành thêm sách
      const bookData = {
        title: data.title,
        author: data.author,
        price: data.price,
        quantity: data.quantity,
        discount: data.discount,
        description: data.description,
        publication_date: data.publication_date,
        image: imageUrl, // Sử dụng link hình ảnh đã upload
      };

      // Gửi thông tin sách vào server
      const bookResponse = await fetch(`${endpoint}/admin/books/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: Cookies.get("authToken"),
        },
        body: JSON.stringify(bookData),
      });

      if (bookResponse.status === 200) {
        toast.success("Thêm sản phẩm thành công", {
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/admin/books");
        }, 2100);
      } else {
        setErrorMessage("Đã có lỗi xảy ra khi thêm sách.");
      }
    } catch (error) {
      setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
    setErrorMessage("");
  };

  const generateDes = async (e) => {
    e.preventDefault();
    if (!data.title || !data.author) {
      toast.warning("Vui lòng nhập tiêu đề và tên tác giả!", {
        setTimeout: 1000,
      });
      return;
    }
    try {
      const desc = await axios.post(`${endpoint}/user/ask`, {
        message: `Tạo mô tả cho sách ${data.title} của tác giả ${data.author}`,
      });
      if (
        !desc.data.reply ||
        desc.data.reply.toLowerCase().includes("lỗi kết nối") ||
        desc.data.reply.toLowerCase().includes("xin lỗi")
      ) {
        toast.error(
          "Không thể tạo mô tả. Vui lòng kiểm tra lại hoặc thử lại sau.",
          {
            autoClose: 3000,
          }
        );
        return;
      }
      if (desc.data.reply.toLowerCase().includes("không có đủ thông tin")) {
        toast.error("Xin lỗi tôi không có đủ thông tin về cuốn sách này.", {
          autoClose: 3000,
        });
        return;
      }
      setData((prev) => ({ ...prev, description: desc.data.reply }));
    } catch (error) {
      toast.error("Lỗi kết nối đến chatbot. Vui lòng thử lại sau.", {
        autoClose: 3000,
      });
    }
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
            <InfoItemLabel>Chọn Hình Ảnh</InfoItemLabel>
            <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
              <Button style={{ marginRight: "575px" }}>Chọn hình ảnh</Button>
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
              as="textarea"
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
          <ButtonWrapper>
            <Button onClick={generateDes}>Tự tạo mô tả</Button>
          </ButtonWrapper>
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
