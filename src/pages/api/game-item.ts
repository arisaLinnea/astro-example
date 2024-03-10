import xml2js from "xml2js";
import { db } from "../../utils/db";
const parser = new xml2js.Parser();
import type { APIRoute } from "astro";
import { boardgames } from "../../models/schema";

export const POST: APIRoute = async ({ request }) => {
  const { id } = await request.json();
  const response = await fetch(
    `https://boardgamegeek.com/xmlapi2/thing?id=${id}`
  );
  const itemList = await response.text();
  const parsedList = await parser.parseStringPromise(itemList);

  const item = parsedList?.items?.item[0];

  await db
    .insert(boardgames)
    .values({
      id: item?.$?.id,
      thumbnail: item?.thumbnail[0],
      image: item?.image[0] as string,
      name: item?.name[0]?.$?.value,
      year: item?.yearpublished[0]?.$?.value,
      description: item?.description[0],
      minplayers: item?.minplayers[0]?.$?.value,
      maxplayers: item?.maxplayers[0]?.$?.value,
      playtime: item?.playingtime[0]?.$?.value,
      minplaytime: item?.minplaytime[0]?.$?.value,
      maxplaytime: item?.maxplaytime[0]?.$?.value,
      minage: item?.minage[0]?.$?.value,
    })
    .onConflictDoNothing();

  return new Response(null, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
