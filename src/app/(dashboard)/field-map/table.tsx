import DataTable from "@/components/ui/table/dataTable";
import React from "react";

const Table = ({ data }: { data: any }) => {
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
