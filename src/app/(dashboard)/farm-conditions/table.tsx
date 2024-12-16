"use client";
import DataTable from "@/components/ui/table/dataTable";
import React from "react";
import moment from "moment";
import Link from "next/link";

const Table = ({ data }: { data: any }) => {
  const columns = [
    {
      header: "Field Name",
      accessorKey: "plant.name",
      enableSorting: false,
      size: 200,
    },
    {
      header: "Image",
      accessorKey: "image_url_processed",
      cell: ({ row }: any) => {
        return (
          <Link
            href={
              process.env.NEXT_PUBLIC_API_URL +
              "/" +
              row.original.image_url_processed
            }
            target="_blank"
            className="text-blue-base underline"
          >
            {row.original.image_url_processed}
          </Link>
        );
      },
      enableSorting: false,
      size: 200,
    },
    {
      header: "Scanned At",
      accessorKey: "created_at",
      cell: ({ row }: any) =>
        moment(row.original.created_at).format("YYYY-MM-DD HH:mm:ss"),
      enableSorting: false,
      size: 200,
    },
    {
      header: "Scanned By",
      accessorKey: "created_by",
      enableSorting: false,
      size: 200,
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: ({ row }: any) => {
        return (
          <div className="flex items-center space-x-2">
            <Link
              href={`/farm-conditions/${row.original.id}`}
              className="text-blue-base underline"
            >
              View
            </Link>
          </div>
        );
      },
      enableSorting: false,
      size: 200,
    },
  ];

  return (
    <DataTable
      dataQuery={data}
      columns={columns}
      withPagination={true}
      isServerSide={true}
    />
  );
};

export default Table;
