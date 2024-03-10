import {
  text,
  sqliteTable,
  integer,
  customType,
} from "drizzle-orm/sqlite-core";

const customJson = <TData>(name: string) =>
  customType<{ data: TData; driverData: string }>({
    dataType() {
      return "json";
    },
    toDriver(value: TData): string {
      return JSON.stringify(value);
    },
  })(name);

export const boardgames = sqliteTable("boardgames", {
  id: integer("id").primaryKey(),
  thumbnail: text("thumbnail").notNull(),
  image: text("image").notNull(),
  name: text("name").notNull(),
  year: integer("year").notNull(),
  description: text("description"),
  minplayers: integer("minplayers").notNull(),
  maxplayers: integer("maxplayers").notNull(),
  playtime: integer("playtime").notNull(),
  minplaytime: integer("minplaytime").notNull(),
  maxplaytime: integer("maxplaytime").notNull(),
  minage: integer("minage").notNull(),
  category: customJson<string[]>("category"),
});

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(),
});
