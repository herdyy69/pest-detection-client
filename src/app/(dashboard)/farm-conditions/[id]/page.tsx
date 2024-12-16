import { getScansById } from "@/server/_services/scans";
import Table from "./table";
import moment from "moment";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const data = await getScansById(params.id);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="plabs-headline-bold-24 font-semibold text-gray-900">
          Farm Conditions - {data?.plant?.name} -{" "}
          {moment(data?.created_at).format("YYYY-MM-DD HH:mm:ss")}
        </h1>
        <Link
          href="/farm-conditions"
          className="btn btn-outline-greyscale flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to List Farm Conditions
        </Link>
      </div>
      <img
        src={process.env.NEXT_PUBLIC_API_URL + "/" + data?.image_url_processed}
        alt="Farm Conditions"
        width={500}
        height={500}
        className="rounded-lg"
      />
      <Table data={data} />
    </div>
  );
}
