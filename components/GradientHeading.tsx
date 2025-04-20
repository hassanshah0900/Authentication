import { ReactNode } from "react";

export default function GradientHeading({ children }: { children: ReactNode }) {
  return (
    <h2
      style={{ lineHeight: 1.3 }}
      className="text-5xl text-center font-bold bg-gradient-to-r from-cyan-500 to-pink-500 bg-clip-text text-transparent"
    >
      {children}
    </h2>
  );
}
