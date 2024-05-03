import { APIRoute } from "astro";
import { db } from "../../utils/db";
import { categories } from "../../models/schema";

export const GET = async () => {
  const categoryList = await db.query.categories.findMany();
  return new Response(JSON.stringify({ list: categoryList }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST = async ({ request }) => {
  const { name } = await request.json();

  await db
    .insert(categories)
    .values({
      id: null,
      name: name,
    })
    .onConflictDoNothing();

  return new Response(null, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
