import React, { useEffect, useState } from "react";
import { InfoItem, InfoItemLabel, Right } from "../../Profile";
import { Title, CategoriesInfo, Form, ButtonWrapper, Button } from "./UpdateProduct";
import Sidebar from "../../../components/sidebar/Sidebar";
import { endpoint } from "../../../data";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { MultiSelect } from 'primereact/multiselect';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   
import 'primereact/resources/primereact.css';                       
import 'primeicons/primeicons.css';                                 
import 'primeflex/primeflex.css';                                   



const AddCategoriesToProduct = () => {
    const [book, setBook] = useState({});

    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(null);
    const navigate = useNavigate();

    const { id } = useParams();

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => { }, [errorMessage]);

    useEffect(() => {
        fetch(`${endpoint}/admin/books/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setBook(data);
            })
            .catch((error) => console.error(error));
    }, [id]);

    useEffect(() => {
        fetch(`${endpoint}/admin/categories`)
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => console.error(error));
    }, []);

    const notBookCategories = categories.filter((allCate) => {
        return !book.categories.find((bookCate) => {
            return allCate.id === bookCate.id
        })
    });

    const handleAddCateBook = () => {
        fetch(`${endpoint}/admin/books/${id}/categories`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: Cookies.get("authToken"),
          },
          body: JSON.stringify(dataSend),
        })
          .then((response) => {
            if (response.status === 200) {
              navigate(`/admin/book/update/${id}`);
              return;
            } else {
              setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại");
            }
          })
          .catch((error) => {
            setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại");
          });
      };

    const dataSend = {id: selectedCategories}

    return (
        <div className="list">
            <Sidebar />

            <Right
                style={{ alignItems: "flex-start", justifyContent: "flex-start" }}
            >
                <Title>Thêm Thể Loại Cho Sản Phẩm "{book.title}"</Title>
                <Form>
                    <InfoItem>
                        <InfoItemLabel>Thể loại hiện có</InfoItemLabel>
                        <CategoriesInfo>{book.categories && book.categories.length > 0 ? book.categories.map((item) => <p>- {item.name} </p>) : ""}</CategoriesInfo>
                    </InfoItem>
                    <InfoItem>
                        <InfoItemLabel>Chọn thể loại để thêm vào</InfoItemLabel>
                        <MultiSelect
                            optionValue="id"
                            value={selectedCategories}
                            options={notBookCategories}
                            onChange={(e) => setSelectedCategories(e.value)}
                            optionLabel="name"
                            placeholder="Chọn thể loại"
                            display="chip"
                            className="w-full md:w-30rem"
                        />
                    </InfoItem>
                    
                    <ButtonWrapper>
            <Button
              onClick={handleAddCateBook}
            >
              Thêm thể loại vào sách
            </Button>
          </ButtonWrapper>
                </Form>
            </Right>

        </div>
    )
}

export default AddCategoriesToProduct
