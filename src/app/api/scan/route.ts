import { serviceCreateScans } from "@/server/_services/scans";
import { createResponse } from "@/server/utils/api";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    const data = {
      plant_id: payload.plant_id,
      image_url_processed: payload.image_url_processed,
      created_by: payload.created_by,
    };

    const detections = payload.detections;

    const generalLedger = await serviceCreateScans(data, detections, "scan");

    return createResponse(201, {
      data: generalLedger,
      message: "Successfully to create general ledger",
    });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return createResponse(400, {
        error: Object.fromEntries(
          Object.entries(error.formErrors.fieldErrors).map(([key, value]) => [
            key,
            value?.join(", ") || "",
          ])
        ),
        message: "Bad request",
      });
    }

    return createResponse(500, { message: (error as Error).message });
  }
}
