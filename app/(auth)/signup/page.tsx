import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";

export default function SignupPage() {
  return (
    <form className="w-full bg-white px-8 py-6 rounded-lg shadow-2xl mt-20 text-center max-w-[320px]">
      <h1 className=" text-2xl font-bold text-heading mb-6">Signup</h1>
      <div className="flex flex-col gap-4">
        <Input type="text" name="name" placeholder="Name" />
        <Input type="text" name="email" placeholder="Email" />
        <Input type="password" name="password" placeholder="Password" />
      </div>
      <Button className="mt-8 mb-2">Sign Up</Button>
      <span className="text-sm text-body ">
        Already have an account?{" "}
        <Link
          className="text-blue-400 hover:text-pink-500 hover:underline transition-colors focus-visible:underline focus-visible:text-pink-500 outline-none"
          href={"/signin"}
        >
          Signin
        </Link>
      </span>
    </form>
  );
}
