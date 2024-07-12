import React from "react";

const WorkBoxMenu = ({
  onDownload,
  onDelete,
  onEdit,
}: {
  onDownload?: () => void;
  onDelete: () => void;
  onEdit?: () => void;
}) => {
  return (
    <div className="absolute bg-white border border-gray-300 rounded shadow-lg p-2 right-0 mt-2 w-24 z-50">
      {onDownload && (
        <button
          className="block w-full text-left px-2 py-1 text-gray-700 hover:bg-gray-100"
          onClick={onDownload}
        >
          다운로드
        </button>
      )}
      {onEdit && (
        <button
          className="block w-full text-left px-2 py-1 text-gray-700 hover:bg-gray-100"
          onClick={onEdit}
        >
          수정
        </button>
      )}
      <button
        className="block w-full text-left px-2 py-1 text-gray-700 hover:bg-gray-100"
        onClick={onDelete}
      >
        삭제
      </button>
    </div>
  );
};

export default WorkBoxMenu;
