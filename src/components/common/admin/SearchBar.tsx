import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import React, { ChangeEvent, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
export type Query = string | number;
type SearchBarProps = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar = ({ setQuery }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState<Query>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setQuery(value);
  };
  return (
    <div className="relative w-[50%]">
      <div className="absolute inset-y-0 left-3 flex items-center pl-3 pointer-events-none">
        <AiOutlineSearch className="text-gray-400" size={20} />
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-full p-4 pl-12 text-sm text-gray-900 border border-gray-300 outline-none rounded-full bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search..."
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
