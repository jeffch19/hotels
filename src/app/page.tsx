import { Suspense } from "react";
import RoomsData from "./_common/rooms-data";
import Spinner from "@/components/spinner";

export default async function Home() {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <RoomsData />
      </Suspense>

    </div>
  );
}
