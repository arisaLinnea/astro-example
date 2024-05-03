import React, { useEffect, useState } from "react";
import type { Boardgame, Game, SearchItem } from "../models/types";
import MyBoardgames from "./MyBoardgames";

const SearchBoardgame = () => {
  const [games, setGames] = useState<SearchItem[]>([]);
  const [myGames, setMyGames] = useState<Boardgame[]>([]);
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

  const fetchMyGames = () => {
    fetch("/api/game-db", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setMyGames(data.list);
        console.log(data.list);
      })
      .catch((error) => console.log(error));
  };

  const buttonDisabled = gameName.length < 3;

  useEffect(() => {
    fetchMyGames();
  }, []);

  return (
    <>
      <main className="my-8 mx-auto max-w-2xl px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Games</h1>
        <ul className="list-none space-y-4">
          {myGames?.map((game) => (
            <MyBoardgames boardgame={game} />
          ))}
        </ul>
      </main>
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
