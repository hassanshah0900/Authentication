import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;
export default function Button({ children, className, ...props }: Props) {
  return (
    <button
      {...props}
      className={twMerge(
        "bg-gradient-to-r text-sm from-cyan-500 to-pink-500 text-white uppercase py-3 px-8 cursor-pointer font-semibold rounded-full w-full focus-visible:outline-cyan-500 outline-1 outline-offset-2",
        className
      )}
    >
      {children}
    </button>
  );
}
