import { useEffect, useState } from "react";
import type { Boardgame } from "../models/types";
import MyBoardgames from "./MyBoardgames";

const MyGames = () => {
  const [myGames, setMyGames] = useState<Boardgame[]>([]);

  const nameSort = (a, b) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  };

  const fetchMyGames = () => {
    fetch("/api/game-db", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setMyGames(data.list.sort(nameSort));
        console.log(data.list);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchMyGames();
  }, []);

  return (
    <main className="my-8 mx-auto px-4">
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
        {myGames?.map((game) => (
          <>
            <MyBoardgames boardgame={game} />
          </>
        ))}
      </div>
    </main>
  );
};

export default MyGames;
