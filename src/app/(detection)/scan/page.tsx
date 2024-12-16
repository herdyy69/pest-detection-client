import { Camera } from "./camera";
import { servicePlants } from "@/server/_services/plants";
import { SearchParams } from "@/server/_schema/api";

export default async function Page(params: { searchParams: SearchParams }) {
  const data = await servicePlants({ page: 1, limit: 9999, search: "" });

  return (
    <div>
      <Camera plants={data} />
    </div>
  );
}
