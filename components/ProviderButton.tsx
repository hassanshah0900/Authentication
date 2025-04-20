import React, { useActionState, useEffect } from "react";
import Button from "./Button";
import { signinWithProvider } from "@/lib/actions/auth-actions";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { supabaseErrorMap } from "@/utils/supabase/errorMap";

export default function ProviderButton({
  provider,
}: {
  provider: "github" | "google";
}) {
  const [state, formAction, isPending] = useActionState(
    signinWithProvider.bind(null, provider),
    null
  );
  const error = state?.error;

  useEffect(() => {
    if (error) toast(supabaseErrorMap[error] ?? error, { type: "error" });
  }, [state]);

  return (
    <form action={formAction}>
      <Button isPending={isPending} type="submit">
        <div className="mr-2">
          {provider === "github" ? <FaGithub /> : <FaGoogle />}
        </div>
        Signin with {provider}
      </Button>
    </form>
  );
}
