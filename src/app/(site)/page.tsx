import { auth } from "@/auth";

export default async function HomePage() {
  const session = await auth();
  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-6 text-default">
      <h1 className="text-4xl font-bold">
        Welcome to Neinter App
      </h1>
    </div>
  );
}