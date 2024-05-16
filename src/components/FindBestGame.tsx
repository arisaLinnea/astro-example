import { useState } from "react";
import type { Boardgame } from "../models/types";

// type FilterItem = {
//   name: string;
//   value: number;
// };

type FilterItem = {
  MinAge?: number;
  NumPlayers?: number;
};

const FindBestGame = () => {
  const ageList = [...Array(100).keys()].map((x) => x++);
  const [ageValue, setAgeValue] = useState<number>(0);
  const playersList = [...Array(10).keys()].map((x) => x++);
  const [playerValue, setPlayerValue] = useState<number>(0);
  const playtime = [...Array(10).keys()].map((x) => x * 15);
  const [games, setGames] = useState<Boardgame[]>([]);
  // const [searchOptions, setSearchOptions] = useState<FilterItem[]>([]);
  const [searchOptions, setSearchOptions] = useState<FilterItem>({});

  const findGame = () => {
    fetch("/api/filter-game-search", {
      method: "POST",
      body: JSON.stringify(searchOptions),
    })
      .then((response) => response.json())
      .then((data) => {
        setGames(data.list);
        console.log(data.list);
      })
      .catch((error) => console.log(error));
  };
  const removeSearchOption = (name: string) => {
    setSearchOptions({ ...searchOptions, [name]: undefined });
  };

  const addSearchOption = (name: string, value: number) => {
    setSearchOptions({ ...searchOptions, [name]: value });
  };

  const renderTag = ({ name, value }) => {
    console.log("renderTag:", name);
    return (
      <span
        id="badge-dismiss-default"
        className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
      >
        {name}: {value}
        <button
          type="button"
          className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
          data-dismiss-target="#badge-dismiss-default"
          aria-label="Remove"
          onClick={() => removeSearchOption(name)}
        >
          <svg
            className="w-2 h-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Remove badge</span>
        </button>
      </span>
    );
  };

  return (
    <>
      <main className="my-8 mx-auto max-w-2xl px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Use filters to search among your own game to find best game to play at
          the moment. You can search for minimum age, number of player and/or
          maximum playtime.
        </h1>

        <div className="w-72">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Age from:
          </label>
          <div className="flex flex-row">
            <select
              id="age"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={ageValue}
              onChange={(e) => {
                setAgeValue(Number(e.target.value));
                addSearchOption("MinAge", Number(e.target.value));
              }}
            >
              {ageList.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {/* <button
              className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm py-2 px-5 mt-4 ml-5 disabled:opacity-75"
              type="submit"
              onClick={() => {
                console.log("Set minage: ", ageValue);
                addSearchOption("MinAge", ageValue);
              }}
            >
              Filteroption
            </button> */}
          </div>
        </div>

        <div className="w-72">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Num players:
          </label>
          <div className="flex flex-row">
            <select
              id="players"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={playerValue}
              onChange={(e) => {
                setPlayerValue(Number(e.target.value));
                addSearchOption("NumPlayers", Number(e.target.value));
              }}
            >
              {playersList.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {/* <button
              className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm py-2 px-5 mt-4 ml-5 disabled:opacity-75"
              type="submit"
              onClick={() => addSearchOption("NumPlayers", playerValue)}
            >
              Filteroption
            </button> */}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 my-5">
          Filters:
          {searchOptions?.MinAge &&
            renderTag({ name: "MinAge", value: searchOptions?.MinAge })}
          {searchOptions?.NumPlayers &&
            renderTag({ name: "NumPlayers", value: searchOptions?.NumPlayers })}
        </div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm py-2 px-5 mt-4 ml-5 disabled:opacity-75"
          type="submit"
          onClick={() => findGame()}
          disabled={Object.keys(searchOptions).length === 0}
        >
          Search
        </button>
      </main>
      <div className="mb-10">
        {games?.map((game) => (
          <div className="flex flex-row gap-2">
            <span>{game.name}</span>
            <span>{game.minage}</span>
            <span>
              {game.minplayers}-{game.maxplayers} players
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default FindBestGame;
