"use server";
import { db } from "@/server/db";
import { scans } from "@/server/_model/scans";
import { detections as detectionsDB } from "@/server/_model/detections";
import { InsertScans, Scans } from "@/server/_schema/scans";
import { asc, desc, eq, sql } from "drizzle-orm";
import { SearchParams } from "@/server/_schema/api";
import { ZodError } from "zod";
import { InsertDetections } from "../_schema/detections";

type OrderByField = keyof Scans;

export const serviceScans = async (request: SearchParams) => {
  const { page = 1, limit = 10, order_by, sort } = request;

  const data = await db.query.scans.findMany({
    columns: {
      id: true,
      image_url_raw: true,
      image_url_processed: true,
      created_at: true,
      created_by: true,
    },
    with: {
      plant: {
        columns: {
          id: true,
          name: true,
        },
      },
      detections: {
        columns: {
          id: true,
          label: true,
          confidence: true,
          count: true,
          percentage: true,
        },
      },
    },
    orderBy: order_by
      ? sort === "ASC"
        ? asc(scans[order_by as OrderByField])
        : desc(scans[order_by as OrderByField])
      : desc(scans.created_at),
    limit: Number(limit),
    offset: (Number(page) - 1) * Number(limit),
  });

  const totalData = await db.execute(sql`
      SELECT COUNT(*) as count
      FROM scans
     `);

  return {
    data,
    page,
    limit,
    totalData: totalData[0].count,
  };
};

export const getScansById = async (id: Scans["id"]) => {
  const [scan] = await db.query.scans.findMany({
    columns: {
      id: true,
      image_url_raw: true,
      image_url_processed: true,
      created_at: true,
      created_by: true,
    },
    with: {
      plant: {
        columns: {
          id: true,
          name: true,
        },
      },
      detections: {
        columns: {
          id: true,
          label: true,
          confidence: true,
          count: true,
          percentage: true,
        },
      },
    },
    where: eq(scans.id, id),
  });

  return scan;
};

export const serviceCreateScans = async (
  scanPayload: InsertScans,
  detectionsPayload: InsertDetections[]
) => {
  try {
    const data = InsertScans.parse(scanPayload);

    const [scan] = await db.insert(scans).values(data).returning();

    const detectionPayload = detectionsPayload.map((detection) => ({
      ...detection,
      scan_id: scan.id,
    }));

    const [detection] = await db
      .insert(detectionsDB)
      .values(detectionPayload)
      .returning();

    return { scan, detection };
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(
        JSON.stringify(
          error.errors.map((e) => ({
            path: e.path.join("."),
            message: e.message,
          }))
        )
      );
    }

    throw error;
  }
};
