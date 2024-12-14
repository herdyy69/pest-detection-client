import { z } from "zod";
import { InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { plants } from "../_model/plants";

const Plants = createSelectSchema(plants);

const InsertPlants = createInsertSchema(plants)
  .pick({
    name: true,
    description: true,
    updated_at: true,
    updated_by: true,
  })
  .extend({
    created_by: z.string().default(() => "system"),
  });

type Plants = InferSelectModel<typeof plants>;
type InsertPlants = z.infer<typeof InsertPlants>;

export { Plants, InsertPlants };
