"use client";

import React from "react";

const WorkBox = ({
  id,
  title,
  date,
  onDelete,
  onEdit,
  onTitleClick,
  isFileUpload,
}: {
  id: string;
  title: string;
  date: string;
  onDelete: () => void;
  onEdit?: () => void;
  onTitleClick?: () => void;
  isFileUpload: boolean;
}) => {
  return (
    <div className="relative border border-gray-300 bg-white p-4 rounded w-48 h-48 flex flex-col justify-between hover:shadow-lg hover:border-blue-500 transition duration-200">
      <div className="cursor-pointer" onClick={onTitleClick || onEdit}>
        <div className="text-lg font-semibold mb-2">{title}</div>
      </div>
      <div className="text-gray-500 mt-4">{date}</div>
      <div
        className="absolute bottom-2 right-2 cursor-pointer"
        onClick={onDelete}
      >
        ❌
      </div>
    </div>
  );
};

export default WorkBox;
