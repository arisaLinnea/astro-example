import { Boardgame } from "./mongodb_old";

export const getAllBoardgames = async () => {
  const boardgames = await (await Boardgame()).find({}).toArray();
  return boardgames;
};

export const createBoardgameEntry = async (newBoardgame) => {
  const boardgame = await (await Boardgame()).insert(newBoardgame);
  return boardgame;
};
