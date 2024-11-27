import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { endpoint } from "../../data";




const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    handleGetUsers();
  }, []);

  const handleGetUsers = () => {
    fetch(`${endpoint}/admin/users`, {
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

  const handleDelete = (id) => {
    fetch(`${endpoint}/admin/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: Cookies.get("authToken"),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          handleGetUsers();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleRestore = (id) => {
    fetch(`${endpoint}/admin/users/restore/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: Cookies.get("authToken"),
      },
      body: JSON.stringify({ isDelete: 0 }),
    })
      .then((response) => {
        if (response.status === 200) {
          handleGetUsers();
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
      width: 200,
      renderCell: (params) => {
        return !params.row.isDelete ? (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Chặn
            </div>
          </div>
        ) : (
          <div className="cellAction">
            <div
              className="restoreButton"
              onClick={() => handleRestore(params.row.id)}
            >
              Bỏ chặn
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">Danh Sách Người Dùng</div>
      <DataGrid
        className="datagrid"
        rows={data}
        // columns={userColumns.concat(actionColumn)}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default Datatable;
