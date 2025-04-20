import Button from "@/components/Button";
import Card from "@/components/Card";
import GradientHeading from "@/components/GradientHeading";
import { supabaseErrorMap } from "@/utils/supabase/errorMap";

export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { error = "", error_description = "" } = await searchParams;

  return (
    <Card className="mt-20">
      <GradientHeading>
        {supabaseErrorMap[error] || error_description}
      </GradientHeading>
      {error === "otp_expired" && (
        <>
          <p className="text-body text-center text-xl mt-5 mb-3">
            The email confirmation link has expired. Please signup again
          </p>
          <span>
            <Button href="/auth/signup">Signup</Button>
          </span>
        </>
      )}
    </Card>
  );
}
