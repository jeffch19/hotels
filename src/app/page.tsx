import { connectMongoDB } from "@/config/db";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
connectMongoDB();

export default async function Home() {
   await GetCurrentUserFromMongoDB();

  return (
    <div>
      Homepage

    </div>
  );
}
