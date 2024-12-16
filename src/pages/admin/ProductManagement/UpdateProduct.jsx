import React, { useEffect, useState } from "react";
import { InfoItem, InfoItemLabel, Right } from "../../Profile";
import Sidebar from "../../../components/sidebar/Sidebar";
import styled from "styled-components";
import { colors, endpoint } from "../../../data";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
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

export const CategoriesInfo = styled.div`
  flex: 5;
  font-size: 14pt;
  padding: 4px;
`;

const CategoriesButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const CategoriesButton = styled.button`
  display: block;
  background-color: ${colors.color3};
  color: white;
  border-radius: 10px;
  cursor: pointer;
  height: 30px;
`;

const UpdateProduct = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(""); // To show the image preview
  const [imageUrl, setImageUrl] = useState(null); // State để lưu URL của hình ảnh

  // Load product data on mount
  useEffect(() => {
    fetch(`${endpoint}/admin/books/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Format the date to ensure it's in the correct format
        const formattedDate = new Date(data.publication_date)
          .toISOString()
          .split("T")[0];
        setData({ ...data, publication_date: formattedDate });

        // Set image preview if there's an existing image URL
        setImagePreview(data.image);
      })
      .catch((error) => {
        setErrorMessage("Không thể tải thông tin sản phẩm.");
        console.error(error);
      });
  }, [id]);

  // Validate the input fields
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

    if (isNaN(data.quantity) || data.quantity < 0) {
      setErrorMessage("Số lượng phải là số hơn hoặc bằng 0.");
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
    setImagePreview(imageUrl);
  };

  // Handle the update request
  const handleUpdateBook = async () => {
    if (!validateInput()) {
      return; // Dừng lại nếu có lỗi
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

      // Send update request
      const bookResponse = await fetch(`${endpoint}/admin/books/id/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: Cookies.get("authToken"),
        },
        body: JSON.stringify(bookData),
      });
      if (bookResponse.status === 200) {
        toast.success("Cập nhật sản phẩm thành công", {
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/admin/books");
        }, 2100);
      } else {
        setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại");
      }
    } catch (error) {
      setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
    setErrorMessage("");
  };

  const handleNavigateAddCate = () => {
    navigate(`/admin/books/${id}/categories/add`);
  };

  const handleNavigateDeleteCate = () => {
    navigate(`/admin/books/${id}/categories/delete`);
  };

  // Handle image file input
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     // Create image preview and update data
  //     const imageUrl = URL.createObjectURL(file);
  //     setImagePreview(imageUrl);
  //     setData((prevData) => ({
  //       ...prevData,
  //       image: imageUrl,
  //     }));
  //   }
  // };

  return (
    <div className="list">
      <Sidebar />
      <Right style={{ alignItems: "flex-start", justifyContent: "flex-start" }}>
        <Title>Chỉnh Sửa Thông Tin Sản Phẩm</Title>
        <Form>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <InfoItem>
            <InfoItemLabel>Đường dẫn hình ảnh</InfoItemLabel>
            <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
              <Button style={{ marginRight: "595px" }}>Chọn hình ảnh</Button>
            </label>
            <FormInput
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }} // Hide the default file input
            />
          </InfoItem>
          {imagePreview && (
            <div style={{ marginLeft: "290px" }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: "150px", height: "200px" }}
              />
            </div>
          )}
          <InfoItem>
            <InfoItemLabel>Tiêu đề</InfoItemLabel>
            <FormInput
              placeholder={"Cuốn sách"}
              value={data.title || ""}
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
              value={data.author || ""}
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
              placeholder={"10"}
              value={data.quantity || ""}
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
              value={data.price || ""}
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
              value={data.discount || ""}
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
              value={data.description || ""}
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
              value={data.publication_date || ""}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  publication_date: e.target.value,
                }))
              }
            />
          </InfoItem>
          <InfoItem>
            <InfoItemLabel>Thể loại</InfoItemLabel>
            <CategoriesInfo>
              {data.categories && data.categories.length > 0
                ? data.categories.map((item, index) => (
                    <p key={index}>- {item.name} </p>
                  ))
                : ""}
            </CategoriesInfo>
            <CategoriesButtonWrapper>
              <CategoriesButton onClick={handleNavigateAddCate}>
                Thêm thể loại
              </CategoriesButton>
              <CategoriesButton onClick={handleNavigateDeleteCate}>
                Xóa thể loại
              </CategoriesButton>
            </CategoriesButtonWrapper>
          </InfoItem>
          <ButtonWrapper>
            <Button onClick={handleUpdateBook}>Cập nhật thông tin</Button>
          </ButtonWrapper>
        </Form>
      </Right>
    </div>
  );
};

export default UpdateProduct;
