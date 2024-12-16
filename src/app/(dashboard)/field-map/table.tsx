"use client";
import { DialogConfirmation } from "@/components/ui/dialog/dialogConfirmation";
import DataTable from "@/components/ui/table/dataTable";
import { Trash } from "lucide-react";
import React from "react";
import { Modal } from "./modal";
import { serviceDeletePlants } from "@/server/_services/plants";
import { toast } from "@/components/ui/alert/toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import moment from "moment";

const Table = ({ data }: { data: any }) => {
  const router = useRouter();

  async function onDelete(id: string) {
    try {
      await serviceDeletePlants(id).then(() => {
        toast.success({
          title: "Success",
          body: "Field deleted successfully",
        });
        router.refresh();
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error({
          title: "Error",
          body: error.message || "Failed to delete field",
        });
      }
    }
  }
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
      header: "Last Scan",
      accessorKey: "scans[0].id",
      cell: ({ row }: any) => {
        return (
          <>
            {row?.original?.scans[0]?.id ? (
              <Link
                href={`/farm-conditions/${row?.original?.scans[0]?.id}`}
                className="text-blue-base underline"
              >
                {moment(row?.original?.scans[0]?.created_at).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}
              </Link>
            ) : (
              "No scan yet"
            )}
          </>
        );
      },
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
              onConfirm={() => {
                onDelete(row.original.id);
              }}
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
