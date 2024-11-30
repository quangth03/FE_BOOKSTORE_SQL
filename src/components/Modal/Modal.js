import React from "react";
import "./Modal.scss";

const Modal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{title}</h2>
        <div className="modal-actions">
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