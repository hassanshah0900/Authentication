"use server";

import { createAdminClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import { getFormFieldValue } from "@/utils/utilityFunctions";
import { redirect } from "next/navigation";
import z from "zod";

export interface AuthState {
  success?: boolean;
  message?: string;
  error?: string;
  data?: FormData;
  validationErrors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
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

  if (!validatedFields.success) {
    return {
      success: false,
      data: formData,
      validationErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: "http://localhost:3000/welcome",
    },
  });

  if (error) return { error: error.code };

  redirect("/auth/check-email");
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

  const { email, password } = validatedFields.data;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error: error.code };

  redirect("/welcome");
}

export async function signout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) return { error: error.code };
}

export async function deleteAccount() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "You are not logged in." };

  const supabaseAdmin = await createAdminClient();
  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);
  if (error) {
    console.log(error);
    return { error: error.code };
  }

  redirect("/auth/signin");
}

export async function signinWithProvider(providerId: "github" | "google") {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: providerId,
    options: { redirectTo: "http://localhost:3000/auth/callback" },
  });

  if (error) return { error: error.code };

  redirect(data.url);
}

export async function forgotPassword(prevState: AuthState, formData: FormData) {
  const emailSchema = signinSchema.shape.email;
  const validatedEmail = emailSchema.safeParse(
    getFormFieldValue(formData.get("email"))
  );

  if (!validatedEmail.success)
    return {
      data: formData,
      validationErrors: { email: validatedEmail.error.flatten().formErrors },
    };

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(
    validatedEmail.data
  );

  if (error) {
    console.log(error);
    return { error: "Couldn't send email. Please try again some time later." };
  }

  return {
    success: true,
    message:
      "A link has been sent to your email. Please click the link to reset your password.",
  };
}

const updatePasswordSchema = z
  .object({
    password: signinSchema.shape.password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export async function updatePassword(prevState: AuthState, formData: FormData) {
  const validatedFields = updatePasswordSchema.safeParse({
    password: getFormFieldValue(formData.get("password")),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success)
    return {
      data: formData,
      validationErrors: validatedFields.error.flatten().fieldErrors,
    };

  const { password } = validatedFields.data;

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.log(error);
    return { error: "Couldn't update password. Please try again." };
  }

  return { success: true, message: "Password successful updated." };
}
