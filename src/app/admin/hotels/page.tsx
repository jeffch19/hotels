import LinkButton from "@/components/link-button";
import PageTitle from "@/components/page-title";
import React from "react";

function HotelsPage() {
  return(
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Hotels" />
        <LinkButton title="Add Hotel" path="/admin/hotels/add" />
      </div>
    </div>
  )
}

export default HotelsPage