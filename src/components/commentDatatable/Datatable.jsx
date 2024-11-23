// import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { commentColumns } from "../../datatablesource";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { endpoint } from "../../data";
import CustomNavLink from "../CustomNavLink";
import { Link } from "react-router-dom";

const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${endpoint}/admin/comments`, {
      headers: {
        authorization: Cookies.get("authToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const actionColumn = [
    {
      field: "action",
      headerName: "Lựa chọn",
      width: 100,
      renderCell: (params) => {
        return !params.row.isDelete ? (
          <div className="cellAction">
            <CustomNavLink
              to={`/books/${params.row.book_id}`}
              width={"100%"}
              height={"60%"}
            >
              <div className="viewButton">Xem</div>
            </CustomNavLink>
            {/* <Link
              to={`/admin/book/update/${params.row.id}`}
              className="updateButton"
              style={{ textDecoration: "none" }}
            >
              Chỉnh sửa
            </Link>
            <div
              className="deleteButton"
              //   onClick={() => handleDelete(params.row.id)}
            >
              Xóa
            </div> */}
          </div>
        ) : (
          <div className="cellAction">
            {/* <div
              className="restoreButton"
              //   onClick={() => handleRestore(params.row.id)}
            >
              Khôi phục
            </div> */}
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">Danh Sách Đánh Giá Và Bình Luận</div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={commentColumns.concat(actionColumn)}
        // columns={commentColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        rowHeight={90}
      />
    </div>
  );
};

export default Datatable;
