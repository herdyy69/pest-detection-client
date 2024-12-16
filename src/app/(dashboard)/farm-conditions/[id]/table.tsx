"use client";
import DataTable from "@/components/ui/table/dataTable";
import React from "react";

const Table = ({ data }: { data: any }) => {
  const datax = {
    data: data.detections,
  };

  const columns = [
    {
      label: "Label",
      accessorKey: "label",
      enableSorting: false,
      size: 200,
    },
    {
      header: "Count",
      accessorKey: "count",
      enableSorting: false,
      size: 200,
    },
    {
      header: "Percentage",
      accessorKey: "percentage",
      cell: ({ row }: any) => row.original.percentage + "%",
      enableSorting: false,
      size: 200,
    },
  ];

  return (
    <DataTable
      dataQuery={datax}
      columns={columns}
      withPagination={false}
      isServerSide={true}
    />
  );
};

export default Table;
