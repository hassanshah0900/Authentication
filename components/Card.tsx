import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "flex flex-col justify-center items-center bg-white shadow-2xl py-6 px-8 pb-8 rounded-xl mx-4 max-w-[800px]",
        className
      )}
    >
      {children}
    </div>
  );
}
