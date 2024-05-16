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
      <div className="mb-4">
        <blockquote className="p-4 rounded">
          <div className="flex flex-col justify-between">
            <button className="" onClick={() => setShowModal(true)}>
              <div>
                <img
                  src={boardgame.image}
                  alt={boardgame.name}
                  className="w-32 object-cover rounded-lg"
                />
              </div>
              <div>
                <p className="text-gray-800 text-lg font-semibold">
                  {boardgame.name}
                </p>
              </div>
              {/* <span className="text-gray-800 text-lg font-semibold">
                Show more
              </span> */}
            </button>
          </div>
        </blockquote>
      </div>
      {showModal ? (
        <GameModal setShowModal={setShowModal} boardgame={boardgame} />
      ) : null}
    </>
  );
};

export default MyBoardgames;
