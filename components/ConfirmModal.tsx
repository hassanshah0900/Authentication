"use client";

import { AnimatePresence, motion } from "motion/react";
import { ReactNode, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Button from "./Button";

interface Props {
  children?: ReactNode;
  buttonText: string;
  isPending?: boolean;
  onConfirm(): void;
}

export default function ConfirmModal({
  children,
  buttonText,
  isPending,
  onConfirm,
}: Props) {
  const [isVisible, setVisibility] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openModal() {
    dialogRef.current?.showModal();
    setVisibility(true);
  }

  function closeModal() {
    setVisibility(false);

    setTimeout(() => dialogRef.current?.close(), 100);
  }

  return (
    <div>
      <dialog
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
        ref={dialogRef}
        className={`overflow-visible bg-transparent left-1/2 top-1/2 -translate-1/2 backdrop:bg-transparent`}
      >
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.3 }}
              exit={{ scale: 0, opacity: 0 }}
              className="bg-white shadow-2xl rounded-b-md overflow-hidden"
            >
              <div className="h-2 bg-gradient-to-r from-cyan-500 to-pink-500" />
              <div className="bg-white px-6 py-4">
                <p className="text-xl text-heading font-semibold text-center mb-10">
                  {children}
                </p>
                <footer className="flex justify-between gap-4 items-center">
                  <Button
                    onClick={() => {
                      onConfirm();
                      closeModal();
                    }}
                    autoFocus
                    className="bg-white text-green-600 border-green-600 hover:bg-green-600 hover:text-white transition border focus:bg-green-600 focus:text-white outline-none"
                  >
                    <FaCheck />
                  </Button>
                  <Button
                    onClick={closeModal}
                    className="bg-white text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition border focus-visible:bg-red-600 focus-visible:text-white outline-none"
                  >
                    <ImCross />
                  </Button>
                </footer>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </dialog>
      <Button isPending={isPending} onClick={openModal}>
        {buttonText}
      </Button>
    </div>
  );
}
