import { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex justify-center items-start bg-gradient-to-r from-cyan-500 to-pink-500 min-h-screen pb-10">
      {children}
    </main>
  );
}

export default AuthLayout;
