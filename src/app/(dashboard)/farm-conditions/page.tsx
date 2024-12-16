import React from "react";
import { SearchParams } from "@/server/_schema/api";
import { serviceScans } from "@/server/_services/scans";
import Table from "./table";

export default async function Page(params: { searchParams: SearchParams }) {
  const data = await serviceScans(params.searchParams);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="plabs-headline-bold-24 font-semibold text-gray-900">
          Farm Conditions
        </h1>
      </div>
      <Table data={data} />
    </div>
  );
}
