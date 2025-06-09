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
      className="w-full leading-[1.5rem] max-w-[600px] max-h-[4vh] px-[0.5rem] my-auto py-[4px] rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 text-[2vh]"
    />
  );
};

export default SearchBar;
