import { servicePlants } from "@/server/_services/plants";
import { serviceScans } from "@/server/_services/scans";
import { Log } from "./log";

export default async function Page() {
  const data = await serviceScans({ page: 1, limit: 9999, search: "" });
  const plants = await servicePlants({ page: 1, limit: 9999, search: "" });

  return (
    <div>
      <Log data={plants} />
    </div>
  );
}
