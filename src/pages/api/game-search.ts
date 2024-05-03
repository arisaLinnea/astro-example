import xml2js from "xml2js";
const parser = new xml2js.Parser();
import type { APIRoute } from "astro";
import { year } from "drizzle-orm/mysql-core";

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
  /*
https://boardgamegeek.com/wiki/page/BGG_XML_API
https://boardgamegeek.com/wiki/page/BGG_XML_API2

https://itnext.io/using-mongodb-with-astro-5c9cf7f1be50
https://docs.astro.build/en/guides/backend/supabase/



<item type="boardgame" id="184013">
<name type="primary" value="Alice in Wonderland (fan expansion for Ticket to Ride)"/>
<yearpublished value="2015"/>
</item>

item type: item?.$?.type        boardgame, boardgameexpansion, (boardgameaccessory)
item id: item?.$?.id
name type: item?.name[0]?.$?.type     primary, alternate
name value: item?.name[0]?.$?.value
yearpublished value: item?.yearpublished[0]?.$?.value

  */

  const { gameName } = await request.json();
  const searchName = gameName.replaceAll(" ", "+");
  const response = await fetch(
    `https://boardgamegeek.com/xmlapi2/search?query=${searchName}&type=boardgame`
  );
  const hotlist = await response.text();
  const parsedList = await parser.parseStringPromise(hotlist);

  const namelist = parsedList?.items?.item
    ?.filter((item) => !item?.name[0]?.$?.value.includes("fan expansion"))
    .map((item) => {
      return {
        name: item?.name[0]?.$?.value,
        id: item?.$?.id,
        year: item?.yearpublished[0]?.$?.value,
      };
    });

  return new Response(JSON.stringify({ list: namelist ? namelist : [] }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
