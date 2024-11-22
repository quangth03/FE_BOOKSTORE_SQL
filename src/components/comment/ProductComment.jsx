import React, { useState, useEffect } from "react";
import { endpoint } from "../../data";
import Cookies from "js-cookie";
import moment from "moment/moment";

export default function ProductComment({ book_id }) {
  const [commentRole, setCommentRole] = useState(false); // Kiểm tra người dùng có quyền bình luận hay không
  const [rating, setRating] = useState(0); // Đánh giá (từ 1 đến 5)
  const [comment, setComment] = useState(""); // Nội dung bình luận
  const [reviews, setReviews] = useState([]); // Dữ liệu các đánh giá đã có

  // Kiểm tra xem người dùng đã bình luận về sách này chưa

  const getReview = () => {
    if (book_id) {
      fetch(`${endpoint}/user/comment/book/${book_id}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setReviews(data);
            console.log("list: ", data);
          } else {
            console.error("Dữ liệu trả về không phải là mảng:", data);
          }
        })
        .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
    }
  };

  useEffect(() => {
    if (Cookies.get("authToken") || book_id) {
      fetch(`${endpoint}/user/comment/check/book/${book_id}`, {
        headers: {
          authorization: Cookies.get("authToken"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCommentRole(data);
        })
        .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
    }
  }, [book_id]);

  useEffect(() => {
    getReview();
  }, [book_id]);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${endpoint}/user/comment/`, {
      method: "POST",
      headers: {
        authorization: Cookies.get("authToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: comment,
        rate: rating,
        book_id: Number(book_id),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCommentRole(data);
        setRating(0);
        setComment("");
        getReview();
      })
      .catch((error) => console.error("Lỗi khi gửi dữ liệu:", error));
  };

  return (
    <div>
      {Cookies.get("authToken") ? (
        commentRole ? (
          <div
            style={{
              maxWidth: "90%",
              margin: "20px auto",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <h2 style={{ fontSize: "24px" }}>Đánh giá</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "5px" }}>
                <div>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => handleStarClick(star)}
                      style={{
                        cursor: "pointer",
                        fontSize: "24px",
                        color: star <= rating ? "gold" : "gray",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Nội dung đánh giá ..."
                  style={{
                    width: "100%",
                    minHeight: "40px",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    resize: "none",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Đánh giá
              </button>
            </form>
          </div>
        ) : (
          <p >
          </p>
        )
      ) : (
        <p></p>
      )}

      {Array.isArray(reviews) && reviews.length > 0 ? (
        <>
          <div
            style={{
              maxWidth: "90%",
              margin: "20px auto",
              paddingLeft: "20px",
            }}
          >
            <h2 style={{ fontSize: "24px" }}>Bình luận</h2>
          </div>

          {reviews.map((item, index) => (
            <div
              key={index}
              style={{
                maxWidth: "90%",
                margin: "10px auto",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <h3 style={{ fontSize: "20px" }}>{item.user.full_name}</h3>
              <p style={{ color: "gray", padding: "5px 0px" }}>
                {moment(item.createdAt).format("DD-MM-YYYY")}
              </p>
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{
                      fontSize: "24px",
                      color: star <= item.rate ? "gold" : "gray",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div>
                <p style={{ marginLeft: "15px" }}>{item.value}</p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p style={{ textAlign: "center", padding: "20px", fontSize: "30px" }}>
          Chưa có bình luận nào.
        </p>
      )}
    </div>
  );
}
