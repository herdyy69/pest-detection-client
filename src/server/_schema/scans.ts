import { z } from "zod";
import { InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { scans } from "../_model/scans";

const Scans = createSelectSchema(scans);

const InsertScans = createInsertSchema(scans)
  .pick({
    plant_id: true,
    image_url_raw: true,
    image_url_processed: true,
    result_ai: true,
  })
  .extend({
    created_by: z.string().default(() => "system"),
  });

type Scans = InferSelectModel<typeof scans>;
type InsertScans = z.infer<typeof InsertScans>;

export { Scans, InsertScans };
