"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { AuthState, signup } from "@/lib/actions/auth-actions";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState<AuthState, FormData>(
    signup,
    {}
  );
  const { data, validationErrors: errors, error } = state;

  useEffect(() => {
    if (error) {
      toast(error, { type: "error" });
    }
  }, [state]);

  return (
    <>
      <ToastContainer />
      <form
        action={formAction}
        className="w-full bg-white px-8 py-6 rounded-lg shadow-2xl mt-20 text-center max-w-[320px]"
      >
        <h1 className=" text-2xl font-bold text-heading mb-6">Signup</h1>
        <div className="flex flex-col gap-4">
          <div>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              defaultValue={data?.get("name")?.toString()}
            />
            {errors?.name &&
              errors.name.map((errorMessage) => (
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
        <Button isPending={isPending} className="mt-8 mb-2">
          Sign Up
        </Button>
        <span className="text-sm text-body ">
          Already have an account?{" "}
          <Link
            className="text-blue-400 hover:text-pink-500 hover:underline transition-colors focus-visible:underline focus-visible:text-pink-500 outline-none"
            href={"/signin"}
          >
            Signin
          </Link>
        </span>
      </form>
    </>
  );
}
