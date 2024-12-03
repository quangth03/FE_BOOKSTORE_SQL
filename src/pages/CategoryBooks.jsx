import React, { useEffect, useState } from "react";
import ProductsList from "../components/ProductsList";
import { endpoint } from "../data";
import PageNavigation from "../components/PageNavigation";
import { Checkbox } from "primereact/checkbox";
import { Slider } from "primereact/slider";
import { Card } from "primereact/card";
import { formatMoney } from "../utils/table-pagination";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import { Banner } from "./Search";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const CategiryBooks = () => {
  const fild = [
    {
      value: "price",
      name: "Giá cả",
    },
    {
      value: "publication_date",
      name: "Ngày xuất bản",
    },
  ];
  const contrain = [
    {
      value: "ASC",
      name: "Tăng dần",
    },
    {
      value: "DESC",
      name: "Giảm dần",
    },
  ];
  const { id } = useParams();
  const query = new URLSearchParams(window.location.search);
  var current = query.get("page");
  const [books, setPopularProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sortBy, setSortBy] = useState("price");
  const [sort, setSort] = useState("ASC");
  const [category, setCategory] = useState(null);

  const updateBook = () => {
    fetch(
      `${endpoint}/user/books/categories/${id}?limit=16&page=${
        Number(current) + 1
      }&from=${priceRange[0]}&to=${priceRange[1]}&sort=${sortBy}&sortD=${sort}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPopularProducts(data);
      })
      .catch((error) => console.error(error));
  };
  const updateCategory = () => {
    fetch(`${endpoint}/user/categories/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    updateBook();
  }, [current]);

  useEffect(() => {
    updateCategory();
  }, []);

  const [wishlist, setWishlist] = useState([]);

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
        console.log("Data from API:", data);
        setWishlist(data);
      });
    console.log("Wishlist in WishList component:", wishlist);
  };
  return (
    <>
      <div
        className="container mx-auto"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div
          style={{
            width: "30%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            marginTop: "125px",
            alignItems: "center",
          }}
        >
          <Card title="Tùy chọn" style={{ width: "80%" }}>
            <div style={{ margin: "25px 5px" }}>
              <h4 style={{ alignItems: "center", marginBottom: "15px" }}>
                Khoảng giá
              </h4>
              <Slider
                value={priceRange}
                onChange={(e) => setPriceRange(e.value)}
                range
                min={0}
                max={1000000}
                step={1000}
              />
              <div style={{ marginTop: "15px" }}>
                {formatMoney(priceRange[0], "")} -{" "}
                {formatMoney(priceRange[1], "")} VNĐ
              </div>
            </div>
            <div style={{ margin: "25px 5px" }}>
              <h4 style={{ alignItems: "center", marginBottom: "15px" }}>
                Sắp xếp
              </h4>
              <SelectButton
                value={sortBy}
                onChange={(e) => setSortBy(e.value)}
                optionLabel="name"
                options={fild}
                style={{ margin: "15px 4px" }}
              />
              <SelectButton
                value={sort}
                onChange={(e) => setSort(e.value)}
                optionLabel="name"
                options={contrain}
                style={{ margin: "10px 8px" }}
              />
            </div>
            <div
              style={{
                margin: "25px 5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button label="Áp dụng" outlined rounded onClick={updateBook} />
            </div>
          </Card>
          <div className="poster p-3">
            <img
              className="px-3 w-full "
              src="https://theme.hstatic.net/200000845405/1001223012/14/widget_banner.jpg?v=335"
              alt="poster"
            />
          </div>
        </div>

        <div style={{ width: "85%" }}>
          <Banner>{category ? category[0].name : "Danh sách "}</Banner>
          <ProductsList
            books={books}
            hasBanner={false}
            wishlist={wishlist}
            fetchWishlist={fetchWishlist}
          />
          <PageNavigation
            current={Number(current)}
            total={100}
            urlPattern={
              category ? `/category/${category[0].id}` : `/category/1`
            }
          />
        </div>
      </div>
    </>
  );
};

export default CategiryBooks;
