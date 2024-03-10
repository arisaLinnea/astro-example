import {
  createBoardgameEntry,
  getAllBoardgames,
} from "../../lib/boardgame_old";

export const GET = async () => {
  const boardgames = await getAllBoardgames();
  if (!boardgames) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  return new Response(JSON.stringify(boardgames), {
    status: 200,
  });
};

export const POST = async ({ request }) => {
  const newBoardgame = await request.json();
  const boardgame = await createBoardgameEntry(newBoardgame);
  return new Response(JSON.stringify(boardgame), {
    status: 200,
  });
};
