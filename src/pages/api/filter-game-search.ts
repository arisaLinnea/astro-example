import { db } from "../../utils/db";
import { boardgames } from "../../models/schema";
import { SQL, gte, sql } from "drizzle-orm";

// export const GET = async () => {
//   const categoryList = await db.query.categories.findMany();
//   return new Response(JSON.stringify({ list: categoryList }), {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   });
// };

export const POST = async ({ request }) => {
  const filter = await request.json();

  console.log("Db search: ", filter);

  const sqlChunks: SQL[] = [];
  //   sqlChunks.push(sql`select * from boardgames`);

  //   if (Object.keys(filter).length === 0) {
  //     sqlChunks.push(sql` where `);
  //   }
  if (filter.MinAge) {
    sqlChunks.push(sql`${boardgames.minage} <= ${filter.MinAge}`);
    // query += `${boardgames.minage} <= ${filter.MinAge}`;
  }

  if (filter.NumPlayers) {
    if (filter.MinAge) {
      sqlChunks.push(sql` and `);
    }
    sqlChunks.push(
      sql`${boardgames.minplayers} <= ${filter.NumPlayers} and ${boardgames.maxplayers} >= ${filter.NumPlayers}`
    );
    // query += `${boardgames.minplayers} <= ${filter.NumPlayers} and ${boardgames.maxplayers} >= ${filter.NumPlayers}`;
  }

  const finalSql: SQL = sql.fromList(sqlChunks);

  console.log("Final SQL: ", finalSql);

  const games = await db.select().from(boardgames).where(finalSql);

  //   console.log("Games: ", games);

  return new Response(JSON.stringify({ list: games }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
