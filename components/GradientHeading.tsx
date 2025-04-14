import { ReactNode } from "react";

export default function GradientHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-5xl text-center font-bold w-max leading-loose bg-gradient-to-r from-cyan-500 to-pink-500 bg-clip-text text-transparent">
      {children}
    </h2>
  );
}
