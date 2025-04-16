import { createClient } from "@/utils/supabase/server";
import { EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/welcome";

  if (!tokenHash || !type) {
    throw new Error("Either Token Hash or Type is not present.");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type,
    options: { redirectTo: next },
  });

  if (error) {
    throw error;
  }

  redirect(next);
}
