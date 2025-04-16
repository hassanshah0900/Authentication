import GradientHeading from "@/components/GradientHeading";

export default function CheckEmailPage() {
  return (
    <div className="bg-white py-4 pb-10 px-8 flex flex-col justify-center items-center rounded-lg shadow-xl mt-20">
      <GradientHeading>Check Your Email</GradientHeading>
      <p className="text-body w-10/12 text-center">
        A confirmation link has been sent to your email. Click the link in your
        email to complete account creation.
      </p>
    </div>
  );
}
