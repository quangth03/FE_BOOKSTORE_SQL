import React from "react";
import "./Modal.scss";

const Modal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="text-align-center">{title}</h2>
        <div className="modal-actions flex justify-content-around align-items-center">
          <button className="confirmButton" onClick={onConfirm}>
            Đồng ý
          </button>
          <button className="cancelButton" onClick={onCancel}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
