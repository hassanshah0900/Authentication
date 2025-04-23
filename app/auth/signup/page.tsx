import SignupForm from "@/components/auth/SignupForm";
import { isAuthenticated } from "@/utils/utilityFunctions";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  if (await isAuthenticated()) redirect("/welcome");

  return <SignupForm />;
}
