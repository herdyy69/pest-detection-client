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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="plabs-headline-bold-24 font-semibold text-gray-900">
          Farm Conditions - {data?.plant?.name} -{" "}
          {moment(data?.created_at).format("YYYY-MM-DD HH:mm:ss")}
        </h1>
        <Link
          href="/farm-conditions"
          className="w-max btn btn-outline-greyscale flex items-center"
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

      <div
        className="plabs-body-regular-16 text-gray-900 space-y-2 content-wysiwyg mt-5 w-[80%]"
        dangerouslySetInnerHTML={{ __html: data?.result_ai || "" }}
      />
    </div>
  );
}
