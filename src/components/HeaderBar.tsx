import "../styles/header.scss";
import SearchBar from "./SearchBar";

export default function HeaderBar({
  onSearch,
}: {
  onSearch: (q: string) => void;
}) {
  return (
    <header className="header">
      <div className="logo">
        🎬 <span>YT4G</span>
      </div>
      <div className="searchbar">
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
}
