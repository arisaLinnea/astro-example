import { useState } from "react";

const FindBestGame = () => {
  const ageList = [...Array(100).keys()].map((x) => x++);
  const [ageValue, setAgeValue] = useState<number>(5);
  const playersList = [...Array(10).keys()].map((x) => x++);
  const [playerValue, setPlayerValue] = useState<number>(6);
  const playtime = [...Array(10).keys()].map((x) => x * 15);
  const [showAgeDropdown, setShowAgeDropdown] = useState<boolean>(false);
  const [showNumPlayersDropdown, setShowNumPlayersDropdown] =
    useState<boolean>(false);
  const [showPlaytimeDropdown, setShowPlaytimeDropdown] =
    useState<boolean>(false);

  const renderTag = ({ value }) => {
    return (
      <span
        id="badge-dismiss-default"
        className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
      >
        {value}
        <button
          type="button"
          className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
          data-dismiss-target="#badge-dismiss-default"
          aria-label="Remove"
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Remove badge</span>
        </button>
      </span>
    );
  };

  const renderDropdown = ({ list, name, condition, toggle }) => {
    return (
      <>
        <button
          id="dropdownUsersButton"
          data-dropdown-placement="bottom"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={() => toggle(true)}
        >
          {name}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {condition && (
          <div
            id="dropdownUsers"
            className="z-10 my-4 bg-white rounded-lg shadow w-24 dark:bg-gray-700"
          >
            <ul
              className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownUsersButton"
            >
              {list.map((item) => (
                <li>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
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
        <div className="grid grid-cols-6 gap-4">
          <div className="col-start-1 col-end-3">Filter:</div>
          <div className="col-start-2 col-end-3">Age above:</div>
          <div className="col-start-4 col-end-5">
            {" "}
            {ageValue ? renderTag({ value: ageValue }) : "Nothing choosen"}
          </div>
          <div className="col-end-7 col-span-2">03</div>
        </div>

        {playerValue && renderTag({ value: playerValue })}
        {renderDropdown({
          list: ageList,
          name: "Above age",
          condition: showAgeDropdown,
          toggle: setShowAgeDropdown,
        })}
        {renderDropdown({
          list: playersList,
          name: "No. players",
          condition: showNumPlayersDropdown,
          toggle: setShowNumPlayersDropdown,
        })}
      </main>
    </>
  );
};

export default FindBestGame;
