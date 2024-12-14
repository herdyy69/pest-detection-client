import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { scans } from "./scans";

const plants = pgTable("plants", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name").notNull(),
  description: varchar("description").notNull(),
  created_at: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  created_by: text("created_by").notNull(),
  updated_at: text("updated_at"),
  updated_by: text("updated_by"),
});

const plantsRelations = relations(plants, ({ one, many }) => ({
  scans: many(scans)
}));

export { plants, plantsRelations };
