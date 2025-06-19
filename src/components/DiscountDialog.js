import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const DiscountDialog = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hiển thị dialog mỗi khi mở lại tab mới (sessionStorage bị reset khi đóng tab)
    setVisible(true);
  }, []);

  return (
    <Dialog
      header="🎉 Ưu đãi đặc biệt!"
      visible={visible}
      style={{ width: "30vw" }}
      onHide={() => setVisible(false)}
      footer={<div></div>}
      modal
      draggable={false}
      resizable={false}
    >
      <div className="text-center">
        <i
          className="pi pi-gift"
          style={{ fontSize: "2rem", color: "#FF5722" }}
        ></i>
        <p className="mt-3 text-lg">
          Chào mừng bạn đến với
          <strong style={{ color: "green" }}> BOOK STORE</strong> <br />
          🎁 Nhận ngay <strong style={{ color: "red" }}>
            giảm giá 20%
          </strong>{" "}
          cho đơn hàng đầu tiên!
        </p>
      </div>
    </Dialog>
  );
};

export default DiscountDialog;
