import Button from "@/components/Button";
import GradientHeading from "@/components/GradientHeading";

export default function WelcomePage() {
  return (
    <main className="flex justify-center h-screen">
      <div className="mt-20">
        <GradientHeading>Welcome Syed Muhammad Hassan Shah</GradientHeading>
        <div className="w-[200px] m-auto">
          <Button>Logout</Button>
        </div>
      </div>
    </main>
  );
}
