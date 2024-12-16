import React from "react";
import { Modal } from "./modal";
import { SearchParams } from "@/server/_schema/api";
import { servicePlants } from "@/server/_services/plants";
import Table from "./table";

export default async function Page(params: { searchParams: SearchParams }) {
  const data = await servicePlants(params.searchParams);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="plabs-headline-bold-24 font-semibold text-gray-900">
          Field Map
        </h1>
        <Modal />
      </div>
      <Table data={data} />
    </div>
  );
}
