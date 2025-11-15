import React, { useState } from "react";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (q: string) => void;
}) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleChange}
      />
      <button type="submit">🔍</button>
    </form>
  );
}
