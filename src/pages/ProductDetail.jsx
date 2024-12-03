import styled from "styled-components";
import React, { useEffect, useState, useContext } from "react";
import TabProductDetail from "../components/TabProductDetail";
import { colors, endpoint } from "../data";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import ProductComment from "../components/comment/ProductComment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from "../components/ProductsList";
import { Banner } from "../pages/Search";

import { MyContext } from "../context/wishListContext";
import { ReWishList } from "../components/ProductItem";
import { WishList } from "../components/ProductItem";

const Container = styled.div`
  margin: 50px 0px;
`;

const Wrapper = styled.div`
  // padding: 50px 0px;
  // display: flex;
`;

const ImgContainer = styled.div`
  // flex: 4;
  // display: flex;
  justify-content: center;
`;

const Image = styled.img`
  object-fit: fill;
  width: 420px;
  height: 550px;
  // width: 100%;
  // height: 100%;
  border: 1px solid #d3d3d3;
`;

const InfoContainer = styled.div`
  // flex: 5;
  // padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 50px;
`;

const Author = styled.p`
  font-size: 35px;
  padding: 10px 0px;
`;

const Quantity = styled.p`
  font-size: 20px;
  padding: 10px 0px;
  color: #cd4949;
`;

const Price = styled.p`
  font-weight: 200;
  font-size: 30px;
  padding: 10px 0px;
  color: ${colors.color1};
`;

const HR = styled.hr``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 0px;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  justify-content: space-between;
`;

const AmountButton = styled.button`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border: 2px solid ${colors.color1};
  background-color: white;
  font-weight: bold;
  font-size: 15pt;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${colors.color1};
    color: white;
  }
`;

const Amount = styled.input.attrs({ type: "number" })`
  width: 70px;
  height: 30px;
  border: 2px solid ${colors.color1};
  border-radius: 8%;
  text-align: center;
  font-size: 16px;
  margin: 0px 5px;
  appearance: textfield; /* Hide default styling for all browsers */

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none; /* Hide spin buttons for WebKit browsers */
    margin: 0;
  }
`;

const AddButton = styled.button`
  // margin-left: 100px;
  padding: 10px;
  border: 2px solid ${colors.color2};
  background-color: white;
  cursor: pointer;
  font-size: 15px;
  border-radius: 10px;

  &:hover {
    background-color: ${colors.color2};
    color: white;
  }
`;

const ProductDetail = () => {
  const [amount, setAmount] = useState(1);
  const [book, setBook] = useState({});
  const [books, setBooks] = useState([]);
  const { id } = useParams();

  const { sharedData } = useContext(MyContext);
  console.log("sharedata", sharedData);

  useEffect(() => {
    fetch(`${endpoint}/user/books/id/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
      })
      .catch((error) => console.error(error));

    fetch(`${endpoint}/user/arrr-books/id/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const data = {
    book_id: Number(id),
    quantity: amount,
  };
  const navigate = useNavigate();
  const handleAddToCart = () => {
    if (Cookies.get("authToken") === undefined) {
      // If no authToken, redirect to the login page
      navigate("/login");
    }
    fetch(`${endpoint}/user/cart`, {
      method: "POST",
      headers: {
        authorization: Cookies.get("authToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => console.error(error));
    toast.success("Thêm vào giỏ hàng thành công", { autoClose: 2000 });
  };

  // const handleAddToWishList = () => {
  //   if (Cookies.get("authToken") === undefined) {
  //     // If no authToken, redirect to the login page
  //     navigate("/login");
  //   }
  //   fetch(`${endpoint}/user/wishList`, {
  //     method: "POST",
  //     headers: {
  //       authorization: Cookies.get("authToken"),
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {})
  //     .catch((error) => console.error(error));
  //   toast.success("Thêm vào yêu thích thành công");
  // };

  const handleChange = (e) => {
    const newValue = e.target.value;
    const min = 1;
    const max = book.quantity;

    if (newValue === "") {
      setAmount("");
    } else if (parseInt(newValue) < min) {
      setAmount(min);
    } else if (parseInt(newValue) > max) {
      setAmount(max);
    } else {
      setAmount(newValue);
    }
  };

  const calculatePrice = (price, discount) => {
    return Math.round(price * (1 - discount / 100));
  };
  const sellPrice = calculatePrice(book.price, book.discount);

  const isWishListed =
    Array.isArray(sharedData) &&
    sharedData.some((wishlistItem) => wishlistItem.id === book.id);

  const [wishlistState, setWishlistState] = useState(isWishListed);

  useEffect(() => {
    setWishlistState(isWishListed); // Cập nhật khi isWishListed thay đổi
  }, [isWishListed]);

  const handleAddToWishList = () => {
    if (Cookies.get("authToken") === undefined) {
      // Nếu không có authToken, chuyển hướng tới trang đăng nhập
      navigate("/login");
    } else {
      fetch(`${endpoint}/user/wishList`, {
        method: "POST",
        headers: {
          authorization: Cookies.get("authToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            toast.success("Thêm vào yêu thích thành công", { autoClose: 2000 });
            setWishlistState(true);
            //fetchWishlist();
          } else {
            toast.error("Lỗi khi thêm sách vào danh sách yêu thích", {
              autoClose: 2000,
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleRemoveItem = (bookId) => {
    fetch(`${endpoint}/user/wishList/${bookId}`, {
      method: "DELETE",
      headers: {
        authorization: Cookies.get("authToken"),
      },
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Đã xóa khỏi danh sách yêu thích", { autoClose: 2000 });
          //fetchWishlist();
          setWishlistState(false);
        } else {
          toast.error("Lỗi khi xóa sách");
        }
      })
      .catch((error) => toast.error("Lỗi khi xóa sách: " + error));
  };
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
      })
      .catch((error) => toast.error("Lỗi khi lấy wishlist: " + error));
  };

  return (
    <div>
      <Container className="container mx-auto">
        <div className="grid-nogutter flex ">
          <Wrapper className="grid-nogutter flex col-9">
            <ImgContainer className="col-6 ">
              <Image
                src={
                  book.image ||
                  "https://www.bookgeeks.in/wp-content/uploads/2022/11/The-Art-of-War-by-Sun-Tzu.jpg"
                }
              />
            </ImgContainer>

            <InfoContainer className="col-6 pr-4">
              <Title>{book.title}</Title>
              <Author>Tác giả: {book.author}</Author>
              <Quantity>Số lượng: {book.quantity}</Quantity>
              <HR />
              <div
                style={{ display: "flex", alignItems: "center", gap: "30px" }}
              >
                <Price>{Number(sellPrice).toLocaleString()} VND</Price>
                {book.discount > 0 && (
                  <del style={{ fontSize: "22px" }}>
                    {Number(book.price).toLocaleString()} VND
                  </del>
                )}
              </div>
              <HR />
              {Cookies.get("isAdmin") ? (
                ""
              ) : (
                <AddContainer>
                  <AmountContainer>
                    <AmountButton
                      onClick={() => (amount > 1 ? setAmount(amount - 1) : 1)}
                    >
                      -
                    </AmountButton>
                    <Amount value={amount} onChange={handleChange}></Amount>

                    <AmountButton
                      onClick={() =>
                        setAmount(amount < book.quantity ? amount + 1 : amount)
                      }
                    >
                      +
                    </AmountButton>
                  </AmountContainer>
                  {!wishlistState ? (
                    <ReWishList
                      style={{ fontSize: "50px" }}
                      onClick={handleAddToWishList}
                    />
                  ) : (
                    <WishList
                      style={{ fontSize: "50px" }}
                      onClick={() => handleRemoveItem(book.id)}
                    />
                  )}
                  <AddButton onClick={handleAddToCart}>
                    {/* <i className="pi pi-cart-plus"></i> */}
                    Thêm vào giỏ hàng
                  </AddButton>
                </AddContainer>
              )}
              <TabProductDetail book={book} />
            </InfoContainer>
          </Wrapper>

          <div className="col-3 border-1 border-300 border-round h-21rem">
            <div className="surface-400 p-2">
              <h3 className="px-3">Chỉ có ở BookStore</h3>
            </div>

            <div className="px-3">
              <div className="flex my-5 align-items-center ">
                <div className="mr-3">
                  <img
                    src="https://theme.hstatic.net/200000845405/1001223012/14/pro_service_icon_1.png?v=351"
                    alt=""
                  />
                </div>
                <div>Sản phẩm 100% chính hãng</div>
              </div>

              <div className="flex my-5 align-items-center">
                <div className="mr-3">
                  <img
                    src="	https://theme.hstatic.net/200000845405/1001223012/14/pro_service_icon_2.png?v=351"
                    alt=""
                  />
                </div>
                <div>Tư vấn mua sách trong giờ hành chính</div>
              </div>

              <div className="flex my-5 align-items-center">
                <div className="mr-3">
                  <img
                    src="https://theme.hstatic.net/200000845405/1001223012/14/pro_service_icon_3.png?v=351"
                    alt=""
                  />
                </div>
                <div>Miễn phí vận chuyển cho tất cả Đơn hàng</div>
              </div>

              <div className="flex my-5 align-items-center">
                <div className="mr-3">
                  <img
                    src="https://theme.hstatic.net/200000845405/1001223012/14/pro_service_icon_5.png?v=351"
                    alt=""
                  />
                </div>
                <div>Hotline: 1900 6401</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ margin: "20px 0px" }}>
          <ProductComment book_id={id} />
        </div>
        {Cookies.get("isAdmin") || books.length == 0 ? (
          <></>
        ) : (
          <>
            <Banner>Các sản phẩm liên quan</Banner>
            <Products
              books={books}
              hasBanner={false}
              wishlist={sharedData}
              fetchWishlist={fetchWishlist}
            >
              {" "}
            </Products>
          </>
        )}
      </Container>
    </div>
  );
};

export default ProductDetail;
