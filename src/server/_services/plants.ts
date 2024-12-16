"use server";
import { db } from "@/server/db";
import { plants } from "@/server/_model/plants";
import { InsertPlants, Plants } from "@/server/_schema/plants";
import { asc, desc, eq, sql } from "drizzle-orm";
import { SearchParams } from "@/server/_schema/api";
import { ZodError } from "zod";

type OrderByField = keyof Plants;

export const servicePlants = async (request: SearchParams) => {
  const { search = "", page = 1, limit = 10, order_by, sort } = request;

  const data = await db.query.plants.findMany({
    columns: {
      id: true,
      name: true,
      description: true,
      created_at: true,
      created_by: true,
      updated_at: true,
      updated_by: true,
    },
    with: {
      scans: {
        columns: {
          id: true,
          image_url_raw: true,
          image_url_processed: true,
          created_at: true,
          created_by: true,
        },
        orderBy: desc(plants.created_at),
        limit: 1,
      },
    },
    where: (plants, { ilike }) => ilike(plants.name, `%${search}%`),
    orderBy: order_by
      ? sort === "ASC"
        ? asc(plants[order_by as OrderByField])
        : desc(plants[order_by as OrderByField])
      : desc(plants.created_at),
    limit: Number(limit),
    offset: (Number(page) - 1) * Number(limit),
  });

  const totalData = await db.execute(sql`
      SELECT COUNT(*) as count
      FROM plants
      WHERE ${(() => {
        const conditions = [];
        if (search) {
          conditions.push(sql`name ILIKE ${`%${search}%`}`);
        }
        return conditions.length > 0
          ? conditions.reduce((a, b) => sql`${a} AND ${b}`)
          : sql`true`;
      })()}
    `);

  return {
    data,
    page,
    limit,
    totalData: totalData[0].count,
  };
};

export const getPlantsById = async (id: Plants["id"]) => {
  const [plant] = await db.query.plants.findMany({
    columns: {
      id: true,
      name: true,
    },
    with: {
      scans: {
        columns: {
          id: true,
          image_url_raw: true,
          image_url_processed: true,
          created_at: true,
          created_by: true,
        },
        with: {
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
      },
    },
    where: eq(plants.id, id),
  });

  return plant;
};

export const serviceCreatePlants = async (payload: InsertPlants) => {
  try {
    const data = InsertPlants.parse(payload);

    const [plant] = await db.insert(plants).values(data).returning();

    return plant;
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

export const serviceUpdatePlants = async (
  id: string,
  payload: InsertPlants
) => {
  try {
    const data = InsertPlants.parse(payload);

    const [plant] = await db
      .update(plants)
      .set({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .where(eq(plants.id, id))
      .returning();

    return plant;
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

export const serviceDeletePlants = async (id: string) => {
  const [plant] = await db.delete(plants).where(eq(plants.id, id)).execute();

  return plant;
};
