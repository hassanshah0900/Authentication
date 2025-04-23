import { createClient } from "./supabase/server";

export function getFormFieldValue(value: FormDataEntryValue | null) {
  return value || undefined;
}

export async function isAuthenticated() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
