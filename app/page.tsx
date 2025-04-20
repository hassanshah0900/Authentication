import Button from "@/components/Button";
import GradientHeading from "@/components/GradientHeading";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center mt-40">
      <GradientHeading>Home Page</GradientHeading>
      <span>
        <Button className="mt-5" href="/welcome">
          Go to welcome page
        </Button>
      </span>
    </div>
  );
}
