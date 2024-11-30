import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productColumns } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { endpoint } from "../../data";
import CustomNavLink from "../CustomNavLink";
import PageNavigation from "../PageNavigation";
import Modal from "../Modal/Modal";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");

  const handleGetBooks = () => {
    fetch(`${endpoint}/admin/books?page=${page ? Number(page) + 1 : 1}`, {
      headers: {
        authorization: Cookies.get("authToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error(error));
  };

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

  useEffect(() => {
    handleGetBooks();
  }, [page]);

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

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh Sách Sản Phẩm
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
