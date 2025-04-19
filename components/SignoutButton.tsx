"use client";

import { useActionState, useEffect } from "react";
import Button from "./Button";
import { signout } from "@/lib/actions/auth-actions";
import { ToastContainer, toast } from "react-toastify";

export default function SignoutButton() {
  const [state, formAction, isPending] = useActionState(signout, null);

  useEffect(() => {
    if (state?.error) toast(state.error, { type: "error" });
  }, [state]);

  return (
    <form action={formAction}>
      <Button isPending={isPending}>Signout</Button>
      <ToastContainer />
    </form>
  );
}
