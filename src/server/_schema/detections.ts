import { z } from "zod";
import { InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { detections } from "../_model/detections";

const Detections = createSelectSchema(detections);

const InsertDetections = createInsertSchema(detections)
  .pick({
    scan_id: true,
    label: true,
    confidence: true,
    count: true,
    percentage: true,
  })
  .extend({
    created_by: z.string().default(() => "system"),
  });

type Detections = InferSelectModel<typeof detections>;
type InsertDetections = z.infer<typeof InsertDetections>;

export { Detections, InsertDetections };
