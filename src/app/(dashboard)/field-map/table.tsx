"use client";
import { DialogConfirmation } from "@/components/ui/dialog/dialogConfirmation";
import DataTable from "@/components/ui/table/dataTable";
import { Trash } from "lucide-react";
import React from "react";
import { Modal } from "./modal";

const Table = ({ data }: { data: any }) => {
  const [open, setOpen] = React.useState(false);
  const columns = [
    {
      header: "Field Name",
      accessorKey: "name",
      enableSorting: false,
      size: 200,
    },
    {
      header: "Description",
      accessorKey: "description",
      enableSorting: false,
      size: 200,
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: ({ row }: any) => {
        return (
          <div className="flex items-center space-x-2 pl-2">
            <Modal name="update" dataY={row.original} />
            <DialogConfirmation
              title="Delete General Ledger"
              body="Are you sure you want to delete this general ledger?"
              confirmText="Delete"
              rejectText="Cancel"
              triggerClassName="p-0 bg-transparent"
              trigger={
                <Trash size={16} className="cursor-pointer text-red-500" />
              }
              onConfirm={() => {}}
              onReject={() => {}}
            />
          </div>
        );
      },
      enableSorting: false,
      size: 50,
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
