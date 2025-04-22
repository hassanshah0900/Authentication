"use client";

import { AuthState, updatePassword } from "@/lib/actions/auth-actions";
import { useActionState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Button from "../Button";
import Card from "../Card";
import Input from "../Input";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

function redirectAfterTwoSeconds() {
  setTimeout(() => {
    toast.promise(
      new Promise((res) => {
        setTimeout(() => {
          res(null);
          redirect("/welcome");
        }, 2000);
      }),
      { pending: "Redirecting...", success: "Success" }
    );
  }, 500);
}

export default function UpdatePasswordForm() {
  const [state, formAction, isPending] = useActionState<AuthState, FormData>(
    updatePassword,
    {}
  );
  const { validationErrors, data, error, message, success } = state;

  useEffect(() => {
    if (error) toast(error, { type: "error" });

    if (success) {
      toast(message, { type: "success", autoClose: false });
      redirectAfterTwoSeconds();
    }
  }, [state]);

  return (
    <Card className="mt-20">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-heading mb-6">Update Password</h1>

      <form action={formAction} className="w-[320px]">
        <div className="space-y-4">
          <div>
            <Input
              name="password"
              type="password"
              defaultValue={data?.get("password")?.toString()}
              placeholder="Password"
            />
            {validationErrors?.password &&
              validationErrors.password.map((errorMessage) => (
                <p
                  key={errorMessage}
                  className="text-sm text-red-500 text-start"
                >
                  {errorMessage}
                </p>
              ))}
          </div>
          <div>
            <Input
              type="password"
              name="confirmPassword"
              defaultValue={data?.get("confirmPassword")?.toString()}
              placeholder="Confirm Password"
            />
            {validationErrors?.confirmPassword &&
              validationErrors.confirmPassword.map((errorMessage) => (
                <p
                  key={errorMessage}
                  className="text-sm text-red-500 text-start"
                >
                  {errorMessage}
                </p>
              ))}
          </div>
        </div>
        <Button isPending={isPending} className="mt-10">
          Submit
        </Button>
      </form>
    </Card>
  );
}
