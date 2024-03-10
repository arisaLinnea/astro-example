import { type Boardgame } from "../models/types";
import React from "react";
import GameModal from "./GameModal";
type Props = {
  boardgame: Boardgame;
};

const MyBoardgames = ({ boardgame }: Props) => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <li className="mb-4">
        <blockquote className="p-4 bg-gray-100 rounded border-l-4 border-gray-300">
          <div className="flex flex-row justify-between">
            <div>
              <p className="text-gray-800 text-lg font-semibold">
                {boardgame.name}
              </p>
              <footer className="mt-2">
                <div>
                  <cite className="font-medium">{boardgame.year}</cite>
                </div>
                <div>
                  Recommended players:{" "}
                  <cite className="font-medium">
                    {boardgame.minplayers} - {boardgame.maxplayers}
                  </cite>
                </div>
                <div>
                  Playtime [min]:{" "}
                  <cite className="font-medium">
                    {boardgame.minplaytime} - {boardgame.maxplaytime}
                  </cite>
                </div>
                <div>
                  Recommended min age:{" "}
                  <cite className="font-medium">{boardgame.minage}</cite>
                </div>
                <button className="" onClick={() => setShowModal(true)}>
                  <span className="text-gray-800 text-lg font-semibold">
                    Show more
                  </span>
                </button>
              </footer>
            </div>
            <div>
              <img
                src={boardgame.thumbnail}
                alt={boardgame.name}
                className="h-20 w-20 object-cover rounded-lg"
              />
            </div>
          </div>
        </blockquote>
      </li>
      {showModal ? (
        <GameModal setShowModal={setShowModal} boardgame={boardgame} />
      ) : null}
    </>
  );
};

export default MyBoardgames;
