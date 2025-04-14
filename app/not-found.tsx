import Button from "@/components/Button";
import GradientHeading from "@/components/GradientHeading";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center mt-40">
      <GradientHeading>This Page doesn't exist.</GradientHeading>
      <span className="">
        <Button href="/">Go Back to Home</Button>
      </span>
    </div>
  );
}
