import React, { useState } from "react";
import type { SearchItem } from "../models/types";

const SearchBoardgame = () => {
  const [games, setGames] = useState<SearchItem[]>([]);
  const [gameName, setGameName] = useState("");

  const fetchGames = () => {
    fetch("/api/game-search", {
      method: "POST",
      body: JSON.stringify({ gameName }),
    })
      .then((response) => response.json())
      .then((data) => {
        setGames(data.list);
        console.log(data.list);
      })
      .catch((error) => console.log(error));
  };

  const saveGame = (id: number) => {
    fetch("/api/game-item", {
      method: "POST",
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const buttonDisabled = gameName.length < 3;

  return (
    <>
      <h1>Search Boardgame (from BoardGameGeek)</h1>
      <div>
        <span>Antal träffar: </span>
        {games.length}
      </div>
      <input
        className="bg-gray-50 border border-gray-300 p-2 rounded-lg"
        type="text"
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
        placeholder="Search for a boardgame"
      />
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm py-2 px-5 ml-5 disabled:opacity-75"
        type="submit"
        onClick={() => fetchGames()}
        disabled={buttonDisabled}
      >
        Search
      </button>
      {games?.map((game) => {
        return (
          <div>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm py-2 px-5 mr-5 disabled:opacity-75"
              onClick={() => saveGame(game.id)}
            >
              Add
            </button>
            <span>{game.name}</span>
            <span> - {game.year}</span>
          </div>
        );
      })}
    </>
  );
};

export default SearchBoardgame;
