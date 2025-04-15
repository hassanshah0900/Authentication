"use server";

import { getFormFieldValue } from "@/utils/utilityFunctions";
import z from "zod";

export interface AuthState {
  success?: boolean;
  error?: string;
  data?: FormData;
  validationErrors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
}

const signinSchema = z
  .object({
    email: z
      .string({ required_error: "Email is Required." })
      .email()
      .min(1, "Email is required")
      .max(100, "Email can be max 100 characters."),
    password: z
      .string({ required_error: "Password is Required." })
      .min(6, "Password must be at least 6 characters.")
      .max(255, "Password can be max 100 characters."),
  })
  .required();

const signupSchema = signinSchema
  .extend({
    name: z
      .string({ required_error: "Name is Required." })
      .min(3, "Name must be at least 3 characters.")
      .max(100, "Name can be max 100 characters."),
  })
  .required();

export async function signup(prevState: AuthState, formData: FormData) {
  const validatedFields = signupSchema.safeParse({
    name: getFormFieldValue(formData.get("name")),
    email: getFormFieldValue(formData.get("email")),
    password: getFormFieldValue(formData.get("password")),
  });

  console.log(formData.get("name"));

  if (!validatedFields.success) {
    return {
      data: formData,
      validationErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  return { success: true };
}

export async function signin(prevState: AuthState, formData: FormData) {
  const validatedFields = signinSchema.safeParse({
    email: getFormFieldValue(formData.get("email")),
    password: getFormFieldValue(formData.get("password")),
  });

  if (!validatedFields.success) {
    return {
      data: formData,
      validationErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  return { success: true };
}
