import { connectMongoDB } from "@/config/db";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from '@clerk/nextjs/server';
connectMongoDB();

export default async function Home() {
  let clerkUserId = "";
  let name = "";
  let email = "";

  const currentUserData = await currentUser();

  if (currentUserData) {
    clerkUserId = currentUserData.id;
    name = currentUserData.firstName + " " + currentUserData.lastName;
    email = currentUserData.emailAddresses[0].emailAddress;
  }

  return (
    <div className="text-sm flex flex-col gap-5 p-5">
      <h1 className="text-3xl text-gray-500 font-bold uppercase">Homepage</h1>
      <h1>Clerk User Id : {clerkUserId}</h1>
      <h1>Clerk User Id : {name}</h1>
      <h1>Clerk User Id : {email}</h1>
      <UserButton
        afterSignOutUrl="/sign-in"
      />

    </div>
  );
}
