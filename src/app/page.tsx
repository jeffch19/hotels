import { connectMongoDB } from "@/config/db";
import { UserType } from "@/interfaces";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
import { UserButton } from "@clerk/nextjs";
// import { currentUser } from '@clerk/nextjs/server';
connectMongoDB();

export default async function Home() {

  const response: any = await GetCurrentUserFromMongoDB();
  let mongoUser: UserType | null = null;
  if (response.success) 
    {
    mongoUser = response.data;
  }
  let mongoUserId = "";
  let clerkUserId = "";
  let name = "";
  let email = "";

  // const currentUserData = await currentUser();

  if (mongoUser) {
    clerkUserId = mongoUser.clerkUserId;
    name = mongoUser.name;
    email = mongoUser.email;
  }

  return (
    <div className="text-sm flex flex-col gap-5 p-5">
      <h1 className="text-3xl text-gray-500 font-bold uppercase">Homepage</h1>
      <h1>Clerk User Id : {clerkUserId}</h1>
      <h1>Mongo User Id : {mongoUserId}</h1>
      <h1>Name : {name}</h1>
      <h1>Email : {email}</h1>
      <UserButton
        afterSignOutUrl="/sign-in"
      />

    </div>
  );
}
