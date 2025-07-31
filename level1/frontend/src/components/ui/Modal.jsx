import React from "react";

export const Modal = ({ isOpen, onClose, children }) => {
  return isOpen ? (
    <div>
      <div className="overlay-style" onClick={onClose}></div>
      <div className="modal-style">{children}</div>
    </div>
  ) : null;
};
