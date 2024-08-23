import LinkButton from "@/components/link-button";
import PageTitle from "@/components/page-title";
import React from "react";

function RoomsPage() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Rooms" />
        <LinkButton path="/admin/rooms/add" title="Add Room" />
      </div>

    </div>
  )
}

export default RoomsPage