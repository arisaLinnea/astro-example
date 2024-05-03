import type { InferSelectModel } from "drizzle-orm";
import { boardgames } from "./schema.ts";

export type Boardgame = InferSelectModel<typeof boardgames>;

export type Game = {
  id: number;
  thumbnail: string;
  image: string;
  name: string;
  year: number;
  description: string;
  minplayers: number;
  maxplayers: number;
  playtime: number;
  minplaytime: number;
  maxplaytime: number;
  minage: number;
};

export type SearchItem = {
  id: number;
  name: string;
};

export type CategoryItem = {
  id: number;
  name: string;
};
