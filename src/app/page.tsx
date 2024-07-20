import { connectMongoDB } from "@/config/db";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
connectMongoDB();

export default async function Home() {
   await GetCurrentUserFromMongoDB();

  return (
    <div>
      <h1>Homepage</h1>

    </div>
  );
}
