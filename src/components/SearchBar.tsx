import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search function name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border px-3 py-2 mb-4 w-full rounded-md text-sm"
    />
  );
};

export default SearchBar;
