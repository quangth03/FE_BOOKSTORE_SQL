import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import ProductsList from "../components/ProductsList";
import { endpoint } from "../data";
import { Button } from "primereact/button";
import Partner from "../components/Partner";
import CustomNavLink from "../components/CustomNavLink";
import Cookies from "js-cookie";

const Home = () => {
  const [books, setPopularProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(`${endpoint}/user/books?limit=100`).then((res) => res.json()),
      fetch(`${endpoint}/admin/categories`).then((res) => res.json()),
    ])
      .then(([booksData, categoriesData]) => {
        setPopularProducts(booksData);
        setCategories(categoriesData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  console.log("categories", categories);
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
    <div
      className="container grid mx-auto mt-2"
      style={{ backgroundColor: "floralwhite" }}
    >
      <div className="" style={{ width: "18.5%" }}>
        <div className="sidebar">
          <div className="category px-3">
            <Categories categories={categories} />
          </div>

          <div className="poster pt-3">
            <a href="">
              <img
                className="px-3 w-full "
                src="https://theme.hstatic.net/200000845405/1001223012/14/widget_banner.jpg?v=335"
                alt="poster"
              />
            </a>
          </div>

          <div className="sachmoibanchay p-3">
            <h3 className="">Sách mới bán chạy</h3>
            <div>
              <div className="h-6rem border-900 border-3 bg-pink-100"></div>
              <div className="w-6 h-6rem border-900 border-3 bg-pink-100"></div>
              <div className="w-6 h-6rem border-900 border-3 bg-pink-100"></div>
              <div className="w-6 h-6rem border-900 border-3 bg-pink-100"></div>
              <div className="w-6 h-6rem border-900 border-3 bg-pink-100"></div>
              <div className="w-6 h-6rem border-900 border-3 bg-pink-100"></div>
              <div className="w-6 h-6rem border-900 border-3 bg-pink-100"></div>
              <div className="w-6 h-6rem border-900 border-3 bg-pink-100"></div>
              <div className="w-6 h-6rem border-900 border-3 bg-pink-100"></div>
              <div className="w-6 h-6rem border-900 border-3 bg-pink-100"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="" style={{ width: "79%", marginLeft: "2rem" }}>
        <div className="slider mt-3">
          <Slider />
        </div>

        <section className="two-img">
          <div className="grid my-5 gap-3">
            <div className="flex-1 col-6  ">
              <img
                className="w-full"
                src="https://theme.hstatic.net/200000845405/1001223012/14/htb_img_1.jpg?v=335"
                alt=""
              />
            </div>

            <div className="flex-1 col-6 ">
              <img
                className="w-full"
                src="https://theme.hstatic.net/200000845405/1001223012/14/htb_img_2.jpg?v=335"
                alt=""
              />
            </div>
          </div>
        </section>

        <section>
          <div className="button flex gap-5">
            <CustomNavLink to={"/books"}>
              <Button className=" p-3" label="Xem Tất Cả"></Button>
            </CustomNavLink>
          </div>
        </section>

        <section>
          {categories.map((category) => (
            <section key={category.id}>
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

        <section>
          <Partner />
        </section>
      </div>
    </div>
  );
};

export default Home;
