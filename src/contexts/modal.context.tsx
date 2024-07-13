// "use client";

// import { Box, Modal } from "@mui/material";
// import {
//   createContext,
//   PropsWithChildren,
//   useContext,
//   useRef,
//   useState,
// } from "react";

// type ModalContextValue = {
//   handleOpen: ({
//     title,
//     description,
//   }: {
//     title?: string;
//     description?: string;
//   }) => void;
//   handleClose: () => void;
// };

// const initialValue: ModalContextValue = {
//   handleOpen: () => {},
//   handleClose: () => {},
// };

// const ModalContext = createContext<ModalContextValue>(initialValue);

// export const useCostumModal = () => useContext(ModalContext);

// type HandleOpenType = {
//   title?: string;
//   description?: string;
//   handleconfirmButtonClick?: () => void;
// };

// export function ModalProvider({ children }: PropsWithChildren) {
//   const [open, setOpen] = useState(false);
//   const [title, setTitle] = useState<string>("");
//   const [description, setDescription] = useState<string>("");
//   const handleConfirmRef = useRef<(() => void) | null>(null);

//   const value = {
//     handleOpen: ({
//       title = "",
//       description = "",
//       handleconfirmButtonClick,
//     }: HandleOpenType) => {
//       setTitle(title);
//       setDescription(description);
//       setOpen(true);
//       handleConfirmRef.current = handleconfirmButtonClick || null;
//     },
//     handleClose: () => setOpen(false),
//   };

//   return (
//     <ModalContext.Provider value={value}>
//       {children}
//       <Modal
//         open={open}
//         onClose={value.handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style} className="px-6 py-3 w-[400px] rounded-md bg-white">
//           {title !== "" && (
//             <h2 className="text-[30px] font-bold text-center">{title}</h2>
//           )}
//           {description !== "" && (
//             <p className="text-center mt-3">{description}</p>
//           )}
//           {handleConfirmRef.current && (
//             <div className="flex gap-3 mt-6 justify-end">
//               <button
//                 className="py-2 px-4 rounded-md border border-neutral-300 bg-white hover:brightness-95 active:brightness-75"
//                 onClick={value.handleClose}
//               >
//                 아니오
//               </button>
//               <button
//                 className="py-2 px-5 border rounded-md border-blue-600 bg-blue-600 text-white hover:brightness-95 active:brightness-75"
//                 onClick={() => {
//                   value.handleClose();
//                   handleConfirmRef.current!();
//                 }}
//               >
//                 예
//               </button>
//             </div>
//           )}
//         </Box>
//       </Modal>
//     </ModalContext.Provider>
//   );
// }

// const style = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   boxShadow: 24,
//   p: 4,
// };

"use client";

import { Box, Modal } from "@mui/material";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from "react";

type ModalContextValue = {
  handleOpen: ({
    title,
    description,
    handleconfirmButtonClick,
  }: HandleOpenType) => void;
  handleClose: () => void;
};

const initialValue: ModalContextValue = {
  handleOpen: () => {},
  handleClose: () => {},
};

const ModalContext = createContext<ModalContextValue>(initialValue);

export const useCostumModal = () => useContext(ModalContext);

type HandleOpenType = {
  title?: string;
  description?: string;
  handleconfirmButtonClick?: () => void;
};

export function ModalProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const handleConfirmRef = useRef<(() => void) | null>(null);

  const value = {
    handleOpen: ({
      title = "",
      description = "",
      handleconfirmButtonClick,
    }: HandleOpenType) => {
      setTitle(title);
      setDescription(description);
      setOpen(true);
      handleConfirmRef.current = handleconfirmButtonClick || null;
    },
    handleClose: () => setOpen(false),
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Modal
        open={open}
        onClose={value.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="px-6 py-3 w-[400px] rounded-md bg-white">
          {title !== "" && (
            <h2 className="text-[30px] font-bold text-center">{title}</h2>
          )}
          {description !== "" && (
            <p className="text-center mt-3">{description}</p>
          )}
          {handleConfirmRef.current && (
            <div className="flex gap-3 mt-6 justify-end">
              <button
                className="py-2 px-4 rounded-md border border-neutral-300 bg-white hover:brightness-95 active:brightness-75"
                onClick={value.handleClose}
              >
                아니오
              </button>
              <button
                className="py-2 px-5 border rounded-md border-blue-600 bg-blue-600 text-white hover:brightness-95 active:brightness-75"
                onClick={() => {
                  value.handleClose();
                  handleConfirmRef.current!();
                }}
              >
                예
              </button>
            </div>
          )}
        </Box>
      </Modal>
    </ModalContext.Provider>
  );
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  p: 4,
};
