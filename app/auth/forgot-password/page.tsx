"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import { AuthState, forgotPassword } from "@/lib/actions/auth-actions";
import { useActionState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState<AuthState, FormData>(
    forgotPassword,
    {}
  );
  const { validationErrors, data, error, message, success } = state;

  useEffect(() => {
    if (error) toast(error, { type: "error" });
    if (success) toast(message, { type: "success", autoClose: false });
  }, [state]);
  return (
    <Card className="mt-20">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-heading mb-6">Forgot Password</h1>

      <form action={formAction} className="w-[320px]">
        <div>
          <Input
            name="email"
            defaultValue={data?.get("email")?.toString()}
            placeholder="Enter your email"
          />
          {validationErrors?.email &&
            validationErrors.email.map((errorMessage) => (
              <p key={errorMessage} className="text-sm text-red-500 text-start">
                {errorMessage}
              </p>
            ))}
        </div>
        <Button isPending={isPending} className="mt-6">
          Send Email
        </Button>
      </form>
    </Card>
  );
}
