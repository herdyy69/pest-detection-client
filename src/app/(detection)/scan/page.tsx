import { Camera } from "./camera";
import { SearchParams } from "@/server/_schema/api";

export default async function Page(params: { searchParams: SearchParams }) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/plants`, {
    cache: "no-cache",
    next: {
      tags: ["plants"],
    },
  }).then((res) => res.json());

  return (
    <div>
      <Camera plants={data} />
    </div>
  );
}
