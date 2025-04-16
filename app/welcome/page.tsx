import Button from "@/components/Button";
import GradientHeading from "@/components/GradientHeading";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function WelcomePage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user) redirect("/signin");

  return (
    <main className="flex justify-center h-screen">
      <div className="mt-20">
        <GradientHeading>
          Welcome {user.user_metadata.name ?? "Brother"}!
        </GradientHeading>
        <div className="flex gap-4 justify-center mt-10">
          <form action="">
            <Button>Logout</Button>
          </form>
          <form action="">
            <Button>Delete Account</Button>
          </form>
        </div>
      </div>
    </main>
  );
}
