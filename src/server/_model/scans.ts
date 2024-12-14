import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { plants } from "./plants";
import { detections } from "./detections";

const scans = pgTable("scans", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  plant_id: text("plant_id")
    .notNull()
    .references(() => plants.id, { onDelete: "cascade" }),
  image_url_raw: text("image_url_raw").notNull(),
  image_url_processed: text("image_url_processed").notNull(),
  created_at: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  created_by: text("created_by").notNull(),
});

const scansRelations = relations(scans, ({ one, many }) => ({
  plant: one(plants, {
    fields: [scans.plant_id],
    references: [plants.id],
  }),
  detections: many(detections),
}));

export { scans, scansRelations };
