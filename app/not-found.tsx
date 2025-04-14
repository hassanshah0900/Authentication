import Button from "@/components/Button";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-5xl font-bold bg-gradient-to-r w-max from-cyan-500 leading-loose to-pink-500 bg-clip-text text-transparent">
        This Page doesn't exist.
      </h2>
      <span className="">
        <Button href="/">Go Back to Home</Button>
      </span>
    </div>
  );
}
