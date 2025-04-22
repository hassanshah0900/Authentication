import SigninForm from "@/components/auth/SigninForm";

export default async function SigninPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | null }>;
}) {
  const { error } = await searchParams;

  return <SigninForm oAuthError={error} />;
}
