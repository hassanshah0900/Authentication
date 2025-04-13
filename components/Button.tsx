import { ReactNode } from "react";

export default function Button({ children }: { children: ReactNode }) {
  return (
    <button className="bg-gradient-to-r text-sm from-cyan-500 to-pink-500 text-white uppercase py-3 px-8 cursor-pointer font-semibold rounded-full w-full">
      {children}
    </button>
  );
}
