import React, { useState, useMemo } from "react";
import { Trie } from "./utils/searchTrie";
import HeaderBar from "./components/HeaderBar";
import { getTopKTrending, VideoItem } from "./utils/topKTrending";
import TrendingRow from "./components/TrendingRow";

import "./styles/main.scss";

const videos: VideoItem[] = [
  {
    id: 1,
    title: "Building Microfrontends",
    views: 54200,
    cat: "Tech",
    channel: "Praveen Codes",
    thumb: "https://placehold.co/320x180/202020/FFF?text=Thumb+1",
  },
  {
    id: 2,
    title: "Heap Sort In Action",
    views: 209000,
    cat: "Tech",
    channel: "Algo Lab",
    thumb: "https://placehold.co/320x180/202020/FFF?text=Thumb+2",
  },
  {
    id: 3,
    title: "Lo-Fi Beats Playlist",
    views: 380000,
    cat: "Music",
    channel: "Zen Beats",
    thumb: "https://placehold.co/320x180/202020/FFF?text=Thumb+3",
  },
  {
    id: 4,
    title: "Intro to OpenTelemetry",
    views: 33800,
    cat: "Tech",
    channel: "Cloud Insights",
    thumb: "https://placehold.co/320x180/202020/FFF?text=Thumb+4",
  },
  {
    id: 5,
    title: "Game AI Evolution",
    views: 520000,
    cat: "Gaming",
    channel: "Next Gen AI",
    thumb: "https://placehold.co/320x180/202020/FFF?text=Thumb+5",
  },
];

const trending = getTopKTrending(videos, 5);

export default function FeedApp() {
  // build trie once
  const trie = useMemo(() => {
    const t = new Trie();
    videos.forEach((v) => t.insert(v.title));
    return t;
  }, [videos]);

  const [filtered, setFiltered] = useState(videos);

  const handleSearch = (query: string) => {
    if (!query) {
      setFiltered(videos);
      return;
    }
    const matches = trie.searchPrefix(query);
    const newList = videos.filter((v) =>
      matches.some((m) => v.title.toLowerCase() === m)
    );
    setFiltered(newList);
  };

  return (
    <div className="feed-container">
      <HeaderBar onSearch={handleSearch} />
      <div className="feed-body">
        <TrendingRow data={trending} />

        <section className="feed-grid">
          {filtered.map((v) => (
            <article key={v.id} className="card">
              <img src={v.thumb} alt={v.title} className="thumb" />
              <h3>{v.title}</h3>
              <p className="meta">
                {v.channel} • {v.views.toLocaleString()} views
              </p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
