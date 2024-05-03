import { useEffect, useState } from "react";
import type { CategoryItem } from "../models/types";

const ChangeCategories = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [catName, setCatName] = useState("");

  const fetchCategories = () => {
    fetch("/api/game-categories", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.list);
      })
      .catch((error) => console.log(error));
  };

  const saveCategory = () => {
    fetch("/api/game-categories", {
      method: "POST",
      body: JSON.stringify({ name: catName }),
    }).catch((error) => console.log(error));
  };

  const buttonDisabled = catName.length < 3;

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <h1>Categories:</h1>
      <main className="my-8 mx-auto max-w-2xl px-4">
        <ul className="list-none space-y-4">
          {categories?.map((cat) => (
            <div key={cat.id}>{cat.name}</div>
          ))}
        </ul>
      </main>
      <h1>Add a category</h1>

      <input
        className="bg-gray-50 border border-gray-300 p-2 rounded-lg"
        type="text"
        value={catName}
        onChange={(e) => setCatName(e.target.value)}
        placeholder="Search for a boardgame"
      />
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm py-2 px-5 ml-5 disabled:opacity-75"
        type="submit"
        onClick={() => saveCategory()}
        disabled={buttonDisabled}
      >
        Add
      </button>
    </>
  );
};

export default ChangeCategories;
