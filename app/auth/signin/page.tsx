import SigninForm from "@/components/auth/SigninForm";
import { isAuthenticated } from "@/utils/utilityFunctions";
import { redirect } from "next/navigation";

export default async function SigninPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | null }>;
}) {
  if (await isAuthenticated()) redirect("/welcome");
  const { error } = await searchParams;

  return <SigninForm oAuthError={error} />;
}
