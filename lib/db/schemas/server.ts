import { date, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const server = pgTable("server", {
    id: text().primaryKey().notNull(),
    name: varchar({ length: 100 }).notNull(),
    ip: text().notNull(),
    type: integer().notNull(),
    os: text().notNull(),
    createdAt: date().defaultNow().notNull(),
});
