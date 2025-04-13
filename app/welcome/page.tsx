import Button from "@/components/Button";

export default function WelcomePage() {
  return (
    <main className="flex justify-center h-screen">
      <div className="mt-20">
        <h1 className="text-5xl font-bold w-max leading-loose bg-gradient-to-r from-cyan-500 to-pink-500 bg-clip-text text-transparent">
          Welcome Syed Muhammad Hassan Shah
        </h1>
        <div className="w-[200px] m-auto">
          <Button>Logout</Button>
        </div>
      </div>
    </main>
  );
}
