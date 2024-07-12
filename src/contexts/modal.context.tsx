"use client";

import { Box, Modal } from "@mui/material";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type ModalContextValue = {
  handleOpen: ({
    title,
    description,
  }: {
    title?: string;
    description?: string;
  }) => void;
  handleClose: () => void;
};

const initialValue: ModalContextValue = {
  handleOpen: () => {},
  handleClose: () => {},
};

const ModalContext = createContext<ModalContextValue>(initialValue);

export const useCostumModal = () => useContext(ModalContext);

export function ModalProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const value = {
    handleOpen: ({
      title = "",
      description = "",
    }: {
      title?: string;
      description?: string;
    }) => {
      setTitle(title);
      setDescription(description);
      setOpen(true);
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
