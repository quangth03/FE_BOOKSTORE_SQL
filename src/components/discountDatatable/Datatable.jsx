import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { discountColumns } from "../../datatablesource"; // Cột liên quan đến discounts
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { endpoint } from "../../data";
import Modal from "../Modal/Modal";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);

  // API để lấy danh sách giảm giá
  const handleGetDiscounts = () => {
    fetch(`${endpoint}/admin/discounts`, {
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

  useEffect(() => {
    handleGetDiscounts();
  }, []);

  const openDeleteModal = (id) => {
    setCurrentDeleteId(id);
    setIsModalOpen(true);
  };


  // Xóa discount
  const handleDelete = (id) => {
    fetch(`${endpoint}/admin/discounts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: Cookies.get("authToken"),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          handleGetDiscounts();
          setIsModalOpen(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Cột hành động (chỉ có Xóa và Chỉnh sửa, không có Khôi phục)
  const actionColumn = [
    {
      field: "action",
      headerName: "Lựa chọn",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/admin/discount/update/${params.row.id}`} // Sửa đường dẫn cập nhật discount
              className="updateButton"
              style={{ textDecoration: "none" }}
            >
              Chỉnh sửa
            </Link>
            <div
              className="deleteButton"
              onClick={() => openDeleteModal(params.row.id)} // Xóa discount
            >
              Xóa
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh Sách Giảm Giá
        <Link to="/admin/discount/add" className="link">
          Thêm Giảm Giá Mới
        </Link>
      </div>
      <Modal
        isOpen={isModalOpen}
        title="Xác nhận xóa"
        onConfirm={() => handleDelete(currentDeleteId)}
        onCancel={() => setIsModalOpen(false)}
      />
      <DataGrid
        className="datagrid"
        rows={data}
        columns={discountColumns.concat(actionColumn)} // Sử dụng cột liên quan đến discounts
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default Datatable;
