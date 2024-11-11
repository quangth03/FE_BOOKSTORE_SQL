import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { listOrderStatus, orderColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { endpoint } from "../../data";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Datatable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${endpoint}/admin/order/all`, {
      headers: {
        authorization: Cookies.get("authToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => console.error(error));
  }, []);
  const handleChange = (event, id) => {
    const tempData = data.map((item) => {
      if (item.id === id) {
        return { ...item, status: event.target.value };
      }
      return item;
    });
    fetch(`${endpoint}/admin/order/update`, {
      method: "POST",
      headers: {
        authorization: Cookies.get("authToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        status: event.target.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => console.error(error));
    setData(tempData);
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
              to={`/admin/order/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Xem</div>
            </Link>
          </div>
        );
      },
    },
  ];

  const statusColumn = [
    {
      field: "status",
      headerName: "Trạng thái",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{ width: 180 }}
              value={params.row.status}
              onChange={(event) => handleChange(event, params.row.id)}
            >
              {listOrderStatus.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">Danh Sách Đơn Hàng</div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={orderColumns.concat(statusColumn, actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default Datatable;
