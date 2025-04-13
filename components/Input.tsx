"use client";

import { InputHTMLAttributes, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ type, className, ...props }: Props) {
  const [isShowing, setShowing] = useState(false);

  if (type === "password")
    return (
      <div
        className={twMerge(
          "flex justify-between items-center border-b focus-within:border-cyan-500 border-body w-full gap-4 text-heading mb-3",
          className
        )}
      >
        <input
          {...props}
          className="w-full  placeholder:text-body outline-none text-base py-1"
          type={isShowing ? "text" : "password"}
        />
        <button
          className="focus-visible:outline-1 cursor-pointer text-lg"
          onClick={() => setShowing(!isShowing)}
          type="button"
        >
          {isShowing ? <IoEyeOutline /> : <IoEyeOffOutline />}
        </button>
      </div>
    );

  return (
    <input
      {...props}
      className={twMerge(
        "w-full block border-b border-body placeholder:text-body text-heading focus:border-cyan-500 outline-none text-base py-1 mb-3",
        className
      )}
      type={type}
    />
  );
}
