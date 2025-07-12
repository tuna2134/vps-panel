CREATE TABLE "setup_script" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"script" text NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL,
	"authorId" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "server" ADD COLUMN "os" text NOT NULL;--> statement-breakpoint
ALTER TABLE "server" ADD COLUMN "createdAt" date DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "server" ADD COLUMN "authorId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "setup_script" ADD CONSTRAINT "setup_script_authorId_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "server" ADD CONSTRAINT "server_authorId_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;