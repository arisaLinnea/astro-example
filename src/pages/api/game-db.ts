import { db } from "../../utils/db";

export async function GET() {
  const boardgameList = await db.query.boardgames.findMany();
  return new Response(JSON.stringify({ list: boardgameList }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
