import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/* --- Tables --- */
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* --- Users schema (keine i18n nötig) --- */
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

/* --- Contact schema: Builder mit i18n + konfigurierbarer minLength --- */
type TFunc = (key: string) => string;

export const buildInsertContactMessageSchema = (opts?: {
  t?: TFunc;
  minMessage?: number; // default 3
}) => {
  const t = opts?.t ?? ((k: string) => {
    // Fallback-Strings (englisch/deutsch gemischt – passe an)
    const fallback: Record<string, string> = {
      "validation.name.min": "Name must be at least 2 characters",
      "validation.email": "Please enter a valid email address",
      "validation.message.min": "Message must be at least 3 characters",
    };
    return fallback[k] ?? k;
  });

  const minMessage = opts?.minMessage ?? 3;

  return createInsertSchema(contactMessages).pick({
    name: true,
    email: true,
    message: true,
  }).extend({
    name: z.string().min(2, { message: t("validation.name.min") }),
    email: z.string().email({ message: t("validation.email") }),
    message: z.string().min(minMessage, { message: t("validation.message.min") }),
  });
};

/* --- Default-Export für Server (ohne i18n, min=3) --- */
export const insertContactMessageSchema = buildInsertContactMessageSchema();

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<ReturnType<typeof buildInsertContactMessageSchema>>;
