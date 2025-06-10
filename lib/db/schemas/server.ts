import { relations } from "drizzle-orm";
import { date, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const server = pgTable("server", {
    id: text().primaryKey().notNull(),
    name: varchar({ length: 100 }).notNull(),
    ip: text().notNull(),
    type: integer().notNull(),
    os: text().notNull(),
    createdAt: date().defaultNow().notNull(),
    authorId: text()
        .references(() => user.id, {
            onDelete: "cascade",
        })
        .notNull(),
});

export const serverRelations = relations(server, ({ one }) => ({
    author: one(user, {
        fields: [server.authorId],
        references: [user.id],
    }),
}));
