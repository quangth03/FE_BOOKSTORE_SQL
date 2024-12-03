import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { endpoint } from "../../data";
import { toast } from "react-toastify";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái mở modal
  const [blockReason, setBlockReason] = useState(""); // Lý do chặn
  const [userIdToBlock, setUserIdToBlock] = useState(null); // ID người dùng cần chặn
  const [errorMessage, setErrorMessage] = useState(""); // Lưu thông báo lỗi

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

  const handleBlockUser = async () => {
    if (!blockReason) {
      setErrorMessage("Vui lòng nhập lý do chặn."); // Hiển thị thông báo lỗi
      return;
    }

    setErrorMessage("");
    const response = await fetch(`${endpoint}/admin/blockUserAndSendEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: Cookies.get("authToken"),
      },
      body: JSON.stringify({
        userId: userIdToBlock, // ID người dùng cần chặn
        blockReason: blockReason, // Lý do chặn
      }),
    });

    if (response.status === 200) {
      toast.success("Chặn người dùng thành công", {
        autoClose: 2000,
      });
      handleGetUsers(); // Cập nhật lại danh sách người dùng
      setIsModalOpen(false); // Đóng modal sau khi chặn thành công
      setBlockReason(""); // Reset lý do chặn
      setErrorMessage("");
    } else {
      alert("Đã xảy ra lỗi khi xử lý yêu cầu của bạn."); // Hiển thị lỗi nếu có
    }
  };

  // const handleDelete = (id) => {
  //   fetch(`${endpoint}/admin/users/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       authorization: Cookies.get("authToken"),
  //     },
  //   })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         handleGetUsers();
  //         setIsModalOpen(false); // Đóng modal sau khi chặn thành công
  //         setBlockReason("");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

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
          toast.info("Bỏ chặn người dùng thành công", {
            autoClose: 2000,
          });
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
              onClick={() => {
                setUserIdToBlock(params.row.id); // Lưu ID người dùng cần chặn
                setIsModalOpen(true); // Mở modal để nhập lý do
              }}
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
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        rowHeight={70}
      />

      {/* Modal (hộp chat) */}
      {isModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <h3>Nhập lý do chặn:</h3>
            {errorMessage && (
              <div style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
                {errorMessage}
              </div>
            )}
            <textarea
              style={{ width: "100%", height: "100px", marginTop: "10px" }}
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
              placeholder="Nhập lý do chặn..."
            ></textarea>
            <div className="flex justify-content-end">
              <button
                style={{
                  color: "white",
                  backgroundColor: "#d33",
                  marginRight: "15px",
                  marginTop: "10px",
                  cursor: "pointer",
                  padding: "8px 16px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "5px",
                }}
                onClick={() => {
                  handleBlockUser(userIdToBlock); // Gọi hàm chặn với ID người dùng
                }}
              >
                Chặn
              </button>
              <button
                style={{
                  backgroundColor: "#3085d6",
                  color: "white",
                  // marginRight: "15px",
                  marginTop: "10px",
                  cursor: "pointer",
                  padding: "8px 16px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "5px",
                }}
                onClick={() => {
                  setIsModalOpen(false);
                  setBlockReason("");
                  setErrorMessage("");
                }}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Datatable;
