"use client";

import { AuthState, signin } from "@/lib/actions/auth-actions";
import { supabaseErrorMap } from "@/utils/supabase/errorMap";
import Link from "next/link";
import { Fragment, useActionState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Button from "../Button";
import Input from "../Input";
import ProviderButton from "./ProviderButton";

export default function SigninForm({
  oAuthError,
}: {
  oAuthError: string | null;
}) {
  const [state, formAction, isPending] = useActionState<AuthState, FormData>(
    signin,
    {}
  );
  const { data, validationErrors: errors, error } = state;

  useEffect(() => {
    if (error) {
      toast(supabaseErrorMap[error], { type: "error" });
    }
  }, [state]);

  useEffect(() => {
    if (oAuthError) toast(supabaseErrorMap[oAuthError], { type: "error" });
  }, [oAuthError]);

  return (
    <Fragment>
      <ToastContainer />
      <div className="w-full block bg-white px-8 py-6 rounded-lg shadow-2xl mt-10 text-center max-w-[320px]">
        <form action={formAction}>
          <h1 className=" text-2xl font-bold text-heading mb-6">Signin</h1>
          <div className="flex flex-col gap-4">
            <div>
              <Input
                type="text"
                name="email"
                placeholder="Email"
                defaultValue={data?.get("email")?.toString()}
              />
              {errors?.email &&
                errors.email.map((errorMessage) => (
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
                name="password"
                placeholder="Password"
                defaultValue={data?.get("password")?.toString()}
              />
              {errors?.password &&
                errors.password.map((errorMessage) => (
                  <p
                    key={errorMessage}
                    className="text-sm text-red-500 text-start"
                  >
                    {errorMessage}
                  </p>
                ))}
            </div>
          </div>
          <Link
            className="text-end block text-blue-400 hover:text-pink-500 hover:underline transition-colors focus-visible:underline focus-visible:text-pink-500 text-sm outline-none"
            href={"/auth/forgot-password"}
          >
            forgot password?
          </Link>
          <Button isPending={isPending} className="mt-6 mb-2">
            Sign In
          </Button>
        </form>
        <span className="text-sm text-body">
          Don't have an account?{" "}
          <Link
            className="text-blue-400 hover:text-pink-500 hover:underline transition-colors focus-visible:underline focus-visible:text-pink-500 outline-none"
            href={"/auth/signup"}
          >
            Signup
          </Link>
        </span>
        <div className="flex justify-center text-body items-center gap-2 my-3">
          <div className="h-[1px] bg-placeholder w-full"></div>
          <span className="-translate-y-0.5">or</span>
          <div className="h-[1px] bg-placeholder w-full"></div>
        </div>
        <div className="my-3 flex flex-col gap-2">
          <ProviderButton provider="github"></ProviderButton>
          <ProviderButton provider="google"></ProviderButton>
        </div>
      </div>
    </Fragment>
  );
}
