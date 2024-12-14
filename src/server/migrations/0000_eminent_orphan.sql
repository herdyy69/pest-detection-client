CREATE TABLE "detections" (
	"id" text PRIMARY KEY NOT NULL,
	"scan_id" text NOT NULL,
	"label" varchar,
	"confidence" text,
	"count" text,
	"percentage" text
);
--> statement-breakpoint
CREATE TABLE "plants" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"created_at" text NOT NULL,
	"created_by" text NOT NULL,
	"updated_at" text,
	"updated_by" text
);
--> statement-breakpoint
CREATE TABLE "scans" (
	"id" text PRIMARY KEY NOT NULL,
	"plant_id" text NOT NULL,
	"image_url_raw" text NOT NULL,
	"image_url_processed" text NOT NULL,
	"created_at" text NOT NULL,
	"created_by" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "detections" ADD CONSTRAINT "detections_scan_id_scans_id_fk" FOREIGN KEY ("scan_id") REFERENCES "public"."scans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scans" ADD CONSTRAINT "scans_plant_id_plants_id_fk" FOREIGN KEY ("plant_id") REFERENCES "public"."plants"("id") ON DELETE cascade ON UPDATE no action;