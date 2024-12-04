import React, { useEffect, useState } from "react";
import ProductsList from "../components/ProductsList";
import { useParams } from "react-router-dom";
import { endpoint } from "../data";
import styled from "styled-components";
import { colors } from "../data";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Slider } from "primereact/slider";
import { formatMoney } from "../utils/table-pagination";
import { SelectButton } from "primereact/selectbutton";
import { Button } from "primereact/button";
import PageNavigation from "../components/PageNavigation";
import Cookies from "js-cookie";

export const Banner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: bold;
  font-size: 40px;
  text-transform: capitalize;

  width: 100%;
  height: 100px;
  color: ${colors.color1};
`;

const Search = () => {
  const { title } = useParams();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    updateBook();
  }, [title]);
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
  const query = new URLSearchParams(window.location.search);
  var current = query.get("page");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sortBy, setSortBy] = useState("price");
  const [sort, setSort] = useState("ASC");

  const updateBook = () => {
    fetch(
      `${endpoint}/user/books?limit=15&page=${
        Number(current) + 1
      }&title=${title}&from=${priceRange[0]}&to=${
        priceRange[1]
      }&sort=${sortBy}&sortD=${sort}&cat=${selectedCategories.join("-")}`
    )
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    updateBook();
  }, [current]);

  useEffect(() => {
    fetch(`${endpoint}/user/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setSelectedCategories(data.map((item) => item.id));
        updateBook();
      })
      .catch((error) => console.error(error));
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.value;
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

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
            height: "120vh",
            display: "flex",
            flexDirection: "column",
            marginTop: "125px",
            alignItems: "center",
          }}
        >
          <Card title="Tùy chọn" style={{ width: "81%" }}>
            <div style={{ margin: "25px 5px" }}>
              <h4 style={{ alignItems: "center", marginBottom: "15px" }}>
                Thể loại
              </h4>
              {categories.map((item) => (
                <div style={{ margin: "5px 0px" }}>
                  <Checkbox
                    inputId={item.id}
                    value={item.id}
                    onChange={handleCategoryChange}
                    checked={selectedCategories.includes(item.id)}
                  />
                  <label htmlFor={item.id} style={{ marginLeft: "5px" }}>
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
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
                style={{ margin: "15px 14px" }}
              />
              <SelectButton
                value={sort}
                onChange={(e) => setSort(e.value)}
                optionLabel="name"
                options={contrain}
                style={{ margin: "10px 19px" }}
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

        <div style={{ width: "97%" }}>
          <Banner>{title}</Banner>
          <ProductsList
            books={books}
            hasBanner={false}
            wishlist={wishlist}
            fetchWishlist={fetchWishlist}
          />
          <PageNavigation
            current={Number(current)}
            total={100}
            urlPattern={`/search/${title}`}
          />
        </div>
      </div>
    </>
  );
};

export default Search;
