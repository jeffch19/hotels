import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <h1 className="text-3xl text-gray-500 font-bold uppercase">Hotels</h1>
      <UserButton 
      afterSignOutUrl="/sign-in"
      />

    </div>
  );
}
