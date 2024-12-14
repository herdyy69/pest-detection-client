import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { scans } from "./scans";

const detections = pgTable("detections", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  scan_id: text("scan_id")
    .notNull()
    .references(() => scans.id, { onDelete: "cascade" }),
  label: varchar("label"),
  confidence: text("confidence"),
  count: text("count"),
  percentage: text("percentage"),
});

const detectionsRelations = relations(detections, ({ one, many }) => ({
  plant: one(scans, {
    fields: [detections.scan_id],
    references: [scans.id],
  }),
}));

export { detections, detectionsRelations };
