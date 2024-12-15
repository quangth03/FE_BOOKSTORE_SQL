import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { listOrderStatus, orderColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { endpoint } from "../../data";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getColor } from "../../datatablesource";

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
        const color = getColor(params.row.status); // Get the color based on the status id

        // Lọc các trạng thái có thể chọn dựa trên giá trị hiện tại của status
        const getSelectableStatuses = (status) => {
          switch (status) {
            case 1:
              return [1, 6]; // Khi status = 1 thì chỉ có thể chọn 1 và 6
            case 2:
              return [2, 3]; // Khi status = 2 thì chỉ có thể chọn 2 và 3
            case 3:
              return [3, 4]; // Khi status = 3 thì chỉ có thể chọn 3 và 4
            case 4:
              return [4, 5]; // Khi status = 4 thì chỉ có thể chọn 4 và 5
            case 5:
              return [5]; // Khi status = 5 thì chỉ có thể chọn 5
            case 6:
              return [6]; // Khi status = 6 thì chỉ có thể chọn 6
            default:
              return []; // Nếu không khớp với các trường hợp trên, không có trạng thái có thể chọn
          }
        };

        const selectableStatuses = getSelectableStatuses(params.row.status); // Danh sách các trạng thái có thể chọn

        return (
          <div className="cellAction">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={params.row.status}
              onChange={(event) => handleChange(event, params.row.id)}
              style={{
                width: 180,
                color: color, // Text color for the selected value
                borderColor: color, // Border color for the select
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: color + "20", // Light background for the dropdown
                  },
                },
              }}
            >
              {listOrderStatus.map(
                (item) =>
                  // Chỉ hiển thị các trạng thái có thể chọn
                  selectableStatuses.includes(item.id) && (
                    <MenuItem
                      key={item.id}
                      value={item.id}
                      style={{ color: getColor(item.id) }}
                    >
                      {item.name}
                    </MenuItem>
                  )
              )}
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
