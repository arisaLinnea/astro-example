import xml2js from "xml2js";
const parser = new xml2js.Parser();
import type { APIRoute } from "astro";

export async function GET() {
  const response = await fetch(
    "https://boardgamegeek.com/xmlapi2/search?query=wingspan&type=boardgame,boardgameexpansion"
  );
  const hotlist = await response.text();
  const parsedList = await parser.parseStringPromise(hotlist);
  const namelist = parsedList?.items?.item.map((item) => {
    return item?.name[0]?.$?.value;
  });
  return new Response(JSON.stringify({ list: namelist }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request }) => {
  const { gameName } = await request.json();
  const searchName = gameName.replaceAll(" ", "+");
  const response = await fetch(
    `https://boardgamegeek.com/xmlapi2/search?query=${searchName}&type=boardgame`
  );
  const hotlist = await response.text();
  const parsedList = await parser.parseStringPromise(hotlist);
  const namelist = parsedList?.items?.item.map((item) => {
    return item?.name[0]?.$?.value;
  });
  return new Response(JSON.stringify({ list: namelist }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
