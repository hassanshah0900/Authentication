"use client";

import Button from "@/components/Button";
import GradientHeading from "@/components/GradientHeading";
import React, { useEffect } from "react";
import { CiFaceFrown } from "react-icons/ci";

export default function RootErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset(): void;
}) {
  useEffect(() => {
    if (error) console.log(error);
  }, [error]);
  return (
    <div className="flex flex-col justify-center items-center mt-40">
      <GradientHeading>
        Something Went Wrong{" "}
        <CiFaceFrown className="text-cyan-500 inline-block" />
      </GradientHeading>
      <span>
        <Button className="mt-5" onClick={() => reset()}>
          Try Again
        </Button>
      </span>
    </div>
  );
}
