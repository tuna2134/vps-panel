import { date, pgTable, text } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { relations } from "drizzle-orm";

export const setupScript = pgTable("setup_script", {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    description: text().notNull(),
    script: text().notNull(),
    createdAt: date().defaultNow().notNull(),
    authorId: text()
        .references(() => user.id, { onDelete: "cascade" })
        .notNull(),
});

export const serverRelations = relations(setupScript, ({ one }) => ({
    author: one(user, {
        fields: [setupScript.authorId],
        references: [user.id],
    }),
}));
