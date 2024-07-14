// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// interface WorkBoxProps {
//   id: string;
//   title: string;
//   date: string;
//   onDelete: () => void;
//   onEdit?: () => void;
//   onTitleClick?: () => void;
//   isFileUpload: boolean;
//   fileURL?: string; // 파일 url추가
// }

// const WorkBox: React.FC<WorkBoxProps> = ({
//   id,
//   title,
//   date,
//   onDelete,
//   onEdit,
//   onTitleClick,
//   isFileUpload,
//   fileURL, // 파일 url 추가
// }) => {
//   const router = useRouter();

//   const handleEditClick = () => {
//     router.push(`/new-resume?id=${id}`);
//   };

//   return (
//     <div className="relative border border-gray-300 bg-white p-4 rounded flex flex-col justify-between hover:shadow-lg hover:border-blue-500 transition duration-200 w-60 h-48">
//       <div className="cursor-pointer" onClick={handleEditClick}>
//         <div className="text-lg font-semibold mb-2">{title}</div>
//       </div>
//       <div className="text-gray-500 mt-4">{date}</div>
//       <div
//         className="absolute bottom-4 right-2 cursor-pointer"
//         onClick={onDelete}
//       >
//         <Image
//           src="/delete-icon.png"
//           alt="Delete Icon"
//           width={24}
//           height={24}
//         />
//       </div>
//     </div>
//   );
// };

// export default WorkBox;

// 최종
// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// interface WorkBoxProps {
//   id: string;
//   title: string;
//   date: string;
//   onDelete: () => void;
//   onEdit?: () => void;
//   onTitleClick?: () => void;
//   isFileUpload: boolean;
// }

// const WorkBox: React.FC<WorkBoxProps> = ({
//   id,
//   title,
//   date,
//   onDelete,
//   onEdit,
//   onTitleClick,
//   isFileUpload,
// }) => {
//   const router = useRouter();

//   const handleEditClick = () => {
//     if (onEdit) {
//       onEdit();
//     } else {
//       router.push(`/new-resume?id=${id}`);
//     }
//   };

//   return (
//     <div className="relative border border-gray-300 bg-white p-4 rounded flex flex-col justify-between hover:shadow-lg hover:border-blue-500 transition duration-200 w-60 h-48">
//       <div className="cursor-pointer" onClick={handleEditClick}>
//         <div className="text-lg font-semibold mb-2 line-clamp-2">{title}</div>
//         <div className="text-gray-500 mb-2">{date}</div>
//       </div>
//       <div className="absolute bottom-2 left-4 text-gray-500">
//         {isFileUpload ? "첨부 완료" : "작성 완료"}
//       </div>
//       <div
//         className="absolute bottom-2 right-2 cursor-pointer"
//         onClick={onDelete}
//       >
//         <Image
//           src="/delete-icon.png"
//           alt="Delete Icon"
//           width={24}
//           height={24}
//         />
//       </div>
//     </div>
//   );
// };

// export default WorkBox;

//
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface WorkBoxProps {
  id: string;
  title: string;
  date: string;
  onDelete: () => void;
  onEdit?: () => void;
  onTitleClick?: () => void;
  isFileUpload: boolean;
}

const WorkBox: React.FC<WorkBoxProps> = ({
  id,
  title,
  date,
  onDelete,
  onEdit,
  onTitleClick,
  isFileUpload,
}) => {
  const router = useRouter();

  const handleEditClick = () => {
    if (onEdit) {
      onEdit();
    } else {
      router.push(`/new-resume?id=${id}`);
    }
  };

  const handleTitleClick = () => {
    if (isFileUpload) {
      onTitleClick && onTitleClick();
    } else {
      handleEditClick();
    }
  };

  return (
    <div className="relative border border-gray-300 bg-white p-4 rounded flex flex-col justify-between hover:shadow-lg hover:border-blue-500 transition duration-200 w-60 h-48">
      <div className="cursor-pointer" onClick={handleTitleClick}>
        <div className="text-lg font-semibold mb-2 line-clamp-2">{title}</div>
        <div className="text-gray-500 mb-2">{date}</div>
      </div>
      <div className="absolute bottom-2 left-4 text-gray-500">
        {isFileUpload ? "첨부 완료" : "작성 완료"}
      </div>
      <div
        className="absolute bottom-2 right-2 cursor-pointer"
        onClick={onDelete}
      >
        <Image
          src="/delete-icon.png"
          alt="Delete Icon"
          width={24}
          height={24}
        />
      </div>
    </div>
  );
};

export default WorkBox;
