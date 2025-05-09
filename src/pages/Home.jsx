import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import ProductsList from "../components/ProductsList";
import { colors, endpoint } from "../data";
import Partner from "../components/Partner";
import CustomNavLink from "../components/CustomNavLink";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import styled from "styled-components";

import AOS from "aos";
import "aos/dist/aos.css"; // Import file CSS của AOS
import Chatbot from "../components/Chatbot/Chatbot";

const TopButton = styled.button`
  background-color: ${colors.color2}; /* Màu nền xanh nhạt */
  color: #fff; /* Màu chữ trắng */
  font-size: 18px; /* Kích thước chữ */
  font-weight: bold; /* Chữ đậm */
  padding: 10px 20px; /* Khoảng cách trong nút */
  border: none; /* Loại bỏ viền mặc định */
  border-radius: 5px; /* Góc bo tròn */
  cursor: pointer; /* Con trỏ chuột chuyển thành tay khi hover */
  transition: all 0.3s ease; /* Hiệu ứng mượt khi hover */

  &:hover {
    background-color: #0056b3; /* Màu nền khi hover */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Đổ bóng khi hover */
    transform: translateY(-2px); /* Hiệu ứng nhấn */
  }

  &:active {
    background-color: #004494; /* Màu nền khi click */
    transform: translateY(0px); /* Trả lại vị trí */
  }
`;

const Img = styled.img`
  transition: transform 0.3s ease, filter 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    filter: brightness(1.2); /* Làm sáng ảnh 20% */
  }
`;

const Home = () => {
  const [books, setPopularProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topBooks, setTopBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // ⚙️ Khởi tạo AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Thời gian hiệu ứng (ms)
      once: true, // Chỉ chạy 1 lần khi cuộn
    });
  }, []);

  useEffect(() => {
    Promise.all([
      fetch(`${endpoint}/user/books?limit=100`).then((res) => res.json()),
      fetch(`${endpoint}/admin/categories`).then((res) => res.json()),
    ])
      .then(([booksData, categoriesData]) => {
        setPopularProducts(booksData.books);
        setCategories(categoriesData);
        // console.log("booksData:", booksData);
        // console.log("categoriesData:", categoriesData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = () => {
    fetch(`${endpoint}/user/wishList`, {
      headers: {
        authorization: Cookies.get("authToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setWishlist(data);
      });
  };

  useEffect(() => {
    fetchTopBooks();
  }, []);

  const fetchTopBooks = () => {
    fetch(`${endpoint}/user/topBooks`, {
      headers: {
        authorization: Cookies.get("authToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTopBooks(data);
        // console.log("Data topBooks:", data);
      });
  };

  return (
    <div
      className="container grid mx-auto mt-2"
      style={{ backgroundColor: "floralwhite" }}
    >
      <div className="" style={{ width: "18.5%" }}>
        <div className="sidebar">
          <div className="category px-3" data-aos="fade-right">
            <Categories categories={categories} />
          </div>

          <div className="poster pt-3" data-aos="zoom-in">
            <Img
              className="px-3 w-full "
              src="https://theme.hstatic.net/200000845405/1001223012/14/widget_banner.jpg?v=335"
              alt="poster"
            />
          </div>

          {/* Hiển thị các sách bán chạy */}
          <div className="sachmoibanchay p-3" data-aos="fade-left">
            <h3 className="mt-5 mb-2">Sách mới bán chạy</h3>
            {topBooks.length > 0 ? (
              topBooks.map((item, index) => (
                <Link
                  key={index}
                  to={`/books/${item.id}`}
                  className="link no-underline text-color"
                  data-aos="fade-up"
                >
                  <div key={item.title}>
                    <div className="flex align-items-center my-4 relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        width="50"
                        className="mr-2 "
                      />
                      <div className="flex flex-column w-13rem">
                        <span className="font-bold mb-2">{item.title}</span>
                        <div className="flex justify-content-between align-items-center">
                          {item.discount > 0 ? (
                            <div>
                              <span className="text-red-500 font-semibold text-sm mr-3">
                                {Number(
                                  (
                                    item.price *
                                    (1 - item.discount / 100)
                                  ).toFixed(0)
                                ).toLocaleString()}
                                đ
                              </span>
                              <del className="text-sm mr-4">
                                {Number(item.price).toLocaleString()}đ
                              </del>
                              <span
                                className="bg-red-400 p-1 border-round text-white text-sm absolute"
                                style={{ top: "-10px", left: "-10px" }}
                              >
                                -{item.discount}%
                              </span>
                            </div>
                          ) : (
                            <span className="text-red-500 font-semibold text-sm">
                              {Number(item.price).toLocaleString()}đ
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <hr></hr>
                  </div>
                </Link>
              ))
            ) : (
              <p>Không có sách bán chạy.</p>
            )}
          </div>
        </div>
      </div>

      <div className="" style={{ width: "79%", marginLeft: "2rem" }}>
        <div className="slider mt-3" data-aos="fade-down">
          <Slider />
        </div>

        <section className="two-img">
          <div className="grid my-5 gap-3">
            <div className="flex-1 col-6" data-aos="zoom-in">
              <Img
                className="w-full"
                src="https://theme.hstatic.net/200000845405/1001223012/14/htb_img_1.jpg?v=335"
                alt=""
              />
            </div>

            <div className="flex-1 col-6" data-aos="zoom-in">
              <Img
                className="w-full"
                src="https://theme.hstatic.net/200000845405/1001223012/14/htb_img_2.jpg?v=335"
                alt=""
              />
            </div>
          </div>
        </section>

        <section data-aos="fade-up">
          <div className="button flex justify-content-center">
            <CustomNavLink to={"/books"}>
              <TopButton>Xem Tất Cả</TopButton>
            </CustomNavLink>
          </div>
        </section>

        <section>
          {categories.map((category) => (
            <section key={category.id} data-aos="fade-up">
              <ProductsList
                books={books
                  .filter((book) =>
                    book.categories.some((cat) => cat.name === category.name)
                  )
                  .slice(0, 10)}
                hasButton={true}
                title={"Sách " + category.name}
                categorie_id={category.id}
                wishlist={wishlist}
                fetchWishlist={fetchWishlist}
              />
            </section>
          ))}
        </section>

        <section data-aos="fade-right">
          <Partner />
        </section>

        <Chatbot />
      </div>
    </div>
  );
};

export default Home;
