import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { endpoint } from "../../data";

const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh Sách Người Dùng
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        // columns={userColumns.concat(actionColumn)}
        columns={userColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default Datatable;
