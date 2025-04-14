import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;
export default function Button({ children, className, href, ...props }: Props) {
  if (href) {
    return (
      <Link
        href={href}
        {...props}
        className={twMerge(
          "inline-block bg-gradient-to-r text-sm from-cyan-500 to-pink-500 text-white uppercase py-3 px-8 cursor-pointer font-semibold rounded-full w-full focus-visible:outline-cyan-500 outline-1 outline-offset-2",
          className
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      {...props}
      className={twMerge(
        "inline-block bg-gradient-to-r text-sm from-cyan-500 to-pink-500 text-white uppercase py-3 px-8 cursor-pointer font-semibold rounded-full w-full focus-visible:outline-cyan-500 outline-1 outline-offset-2",
        className
      )}
    >
      {children}
    </button>
  );
}
