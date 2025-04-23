import UpdatePasswordForm from "@/components/auth/UpdatePasswordForm";
import { isAuthenticated } from "@/utils/utilityFunctions";
import { redirect } from "next/navigation";

export default async function UpdatePasswordPage() {
  if (!(await isAuthenticated())) redirect("/auth/signin");

  return <UpdatePasswordForm />;
}
