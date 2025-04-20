"use client";

import { useActionState, useEffect } from "react";
import Button from "./Button";
import { signout } from "@/lib/actions/auth-actions";
import { ToastContainer, toast } from "react-toastify";
import { supabaseErrorMap } from "@/utils/supabase/errorMap";

export default function SignoutButton() {
  const [state, formAction, isPending] = useActionState(signout, null);
  const error = state?.error;

  useEffect(() => {
    if (error) toast(supabaseErrorMap[error] ?? error, { type: "error" });
  }, [state]);

  return (
    <form action={formAction}>
      <Button isPending={isPending}>Signout</Button>
      <ToastContainer />
    </form>
  );
}
