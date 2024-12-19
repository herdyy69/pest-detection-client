import { servicePlants } from "@/server/_services/plants";
import { createResponse } from "@/server/utils/api";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const data = await servicePlants({
      page: 1,
      limit: 9999,
      search: "",
    });

    if (data.data.length === 0) {
      return createResponse(200, {
        data: [],
        message: "No data found",
      });
    }

    return createResponse(200, {
      data: data.data,
      message: "Successfully to get plants",
    });
  } catch (error) {
    return createResponse(500, { message: (error as Error).message });
  }
}
