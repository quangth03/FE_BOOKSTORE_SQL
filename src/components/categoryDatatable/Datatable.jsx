import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { categoryColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { endpoint } from "../../data";

const Datatable = () => {
  const [data, setData] = useState([]);

  const handleGetCategories = () => {
    fetch(`${endpoint}/admin/categories`, {
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
    handleGetCategories();
  }, []);

  const handleDelete = (id) => {
    fetch(`${endpoint}/admin/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: Cookies.get("authToken"),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          handleGetCategories();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Lựa chọn",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/admin/category/update/${params.row.id}`}
              className="updateButton"
              style={{ textDecoration: "none" }}
            >
              Chỉnh sửa
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
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
        Danh Sách Thể Loại
        <Link to="/admin/category/add" className="link">
          Thêm Thể Loại Mới
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={categoryColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default Datatable;
