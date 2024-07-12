"use client";

import React from "react";

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  confirmText,
  cancelText,
  confirmButtonColor,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  confirmText: string;
  cancelText: string;
  confirmButtonColor: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-md w-80">
        <h2 className="text-lg mb-4">{title}</h2>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            className={`px-4 py-2 rounded text-white ${confirmButtonColor}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
