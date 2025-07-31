import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return isOpen ? (
    <div>
      <div className="overlay-style" onClick={onClose}></div>
      <div className="modal-style">{children}</div>
    </div>
  ) : null;
};

export default Modal;
