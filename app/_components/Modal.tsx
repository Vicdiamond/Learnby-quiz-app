"use client";

import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import useOutsideClick from "../_hooks/useOutsideClick";
import iconCloseModal from "@/public/assets/images/icon-close-modal.svg";
import Image from "next/image";

type ModalContextType = {
  open: (name: string) => void;
  close: () => void;
  openName: string;
};
const ModalContext = createContext<ModalContextType | undefined>(undefined);

function Modal({ children }: { children: React.ReactElement }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ close, open, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  opens: opensWindowName,
}: {
  children: React.ReactElement;
  opens: string;
}) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("context was used outside of it provider");

  const { open } = context;

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

interface WindowPropTypes {
  children: React.ReactElement;
  name: string;
}

function Window({ children, name }: WindowPropTypes) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("context was used outside of it provider");

  const { openName, close } = context;

  const ref = useOutsideClick(name, openName, close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed top-0 left-0  w-full h-screen bg-[rgba(0,0,0,0.3)] backdrop-blur-sm z-[1000] transition-all duration-500 flex justify-center items-center">
      <motion.div
        className=" bg-white rounded-lg shadow-lg py-2 px-2 xl:p-4 transition-all duration-500 w-full max-w-[335px] xl:max-w-[560px]"
        ref={ref}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{
          duration: 0.1,
          ease: "easeInOut",
        }}
      >
        <div className="flex justify-end items-center">
          <button onClick={close}>
            <Image src={iconCloseModal} alt="close-modal" />
          </button>
        </div>
        {cloneElement(children, { onCloseModal: close })}
      </motion.div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
