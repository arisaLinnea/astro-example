import type { Boardgame } from "../models/types";
import { decode } from "html-entities";

type Props = {
  setShowModal: (arg0: boolean) => void;
  boardgame: Boardgame;
};

const GameModal = ({ setShowModal, boardgame }: Props) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="max-h-[calc(100vh-12rem)] overflow-y-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">{boardgame.name}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <div className="p-5 border-b border-solid border-blueGray-200 rounded-t">
              <div>
                Released: <cite className="font-medium">{boardgame.year}</cite>
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
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                {decode(boardgame.description)}
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default GameModal;
