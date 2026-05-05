"use client";

import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SearchBar = ({ value, onChange }: Props) => {
  return (
    <div className="flex items-center gap-2 border rounded-full px-4 py-2 bg-white shadow-sm w-full md:w-80">
      <Search className="w-4 h-4 text-gray-500" />

      <input
        type="text"
        placeholder="Search jewelry..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full outline-none text-sm bg-transparent"
      />
    </div>
  );
};

export default SearchBar;