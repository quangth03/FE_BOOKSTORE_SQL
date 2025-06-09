import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productColumns } from "../../datatablesource";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { endpoint } from "../../data";
import CustomNavLink from "../CustomNavLink";
import PageNavigation from "../PageNavigation";
import Modal from "../Modal/Modal";

const searchStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    margin: "10px 0",
    padding: "6px 12px",
    backgroundColor: "#f7f9fc",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
    position: "relative",
    maxWidth: "500px",
  },
  input: {
    flex: 1,
    minWidth: "300px",
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
  },
  clearButton: {
    padding: "6px",
    position: "absolute",
    right: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#222222",
  },
};

const Datatable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const search = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(search);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);

  // Debounce search input để tránh gọi API quá nhiều lần khi gõ
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Khi debouncedSearch thay đổi thì cập nhật URL để page = 0 và search query mới
  useEffect(() => {
    navigate(
      `/admin/books?page=0&search=${encodeURIComponent(debouncedSearch)}`
    );
  }, [debouncedSearch, navigate]);

  // Phần fetch dữ liệu từ API giữ nguyên như code ban đầu,
  // có thêm search query nếu có
  const handleGetBooks = () => {
    fetch(
      `${endpoint}/admin/books?page=${page ? Number(page) + 1 : 1}${
        search ? `&search=${encodeURIComponent(search)}` : ""
      }`,
      {
        headers: {
          authorization: Cookies.get("authToken"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error(error));
  };

  // Gọi lại fetch khi page hoặc search thay đổi
  useEffect(() => {
    handleGetBooks();
  }, [page, search]);

  const openDeleteModal = (id) => {
    setCurrentDeleteId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    fetch(`${endpoint}/admin/books/${currentDeleteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: Cookies.get("authToken"),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          handleGetBooks();
          setIsModalOpen(false);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleRestore = (id) => {
    fetch(`${endpoint}/admin/books/restore/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: Cookies.get("authToken"),
      },
      body: JSON.stringify({ isDelete: 0 }),
    })
      .then((response) => {
        if (response.status === 200) {
          handleGetBooks();
        }
      })
      .catch((error) => console.error(error));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Lựa chọn",
      width: 200,
      renderCell: (params) => {
        return !params.row.isDelete ? (
          <div className="cellAction">
            <CustomNavLink
              to={`/books/${params.row.id}`}
              width={"100%"}
              height={"60%"}
            >
              <div className="viewButton">Xem</div>
            </CustomNavLink>
            <Link
              to={`/admin/book/update/${params.row.id}`}
              className="updateButton"
              style={{ textDecoration: "none" }}
            >
              Chỉnh sửa
            </Link>
            <div
              className="deleteButton"
              onClick={() => openDeleteModal(params.row.id)}
            >
              Ẩn
            </div>
          </div>
        ) : (
          <div className="cellAction">
            <div
              className="restoreButton"
              onClick={() => handleRestore(params.row.id)}
            >
              Khôi phục
            </div>
          </div>
        );
      },
    },
  ];

  // Xóa tìm kiếm (clear input và reset URL)
  const handleClearSearch = () => {
    setSearchQuery("");
    setDebouncedSearch("");
    navigate(`/admin/books?page=0&search=`);
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh Sách Sản Phẩm
        <div style={searchStyles.container}>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            style={searchStyles.input}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              style={searchStyles.clearButton}
              onClick={handleClearSearch}
              title="Xoá tìm kiếm"
            >
              x
            </button>
          )}
        </div>
        <Link to="/admin/book/add" className="link">
          Thêm Sản Phẩm Mới
        </Link>
      </div>
      <Modal
        isOpen={isModalOpen}
        title="Xác nhận ẩn"
        message="Bạn có chắc chắn muốn xóa không?"
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
      />
      <DataGrid
        className="datagrid"
        rows={data}
        columns={productColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        rowHeight={90}
      />
      <PageNavigation
        current={Number(page)}
        total={42}
        urlPattern="/admin/books"
      />
    </div>
  );
};

export default Datatable;
