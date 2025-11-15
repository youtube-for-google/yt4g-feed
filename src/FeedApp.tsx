import React, { useState, useMemo, useEffect } from "react";
import { Trie } from "./utils/searchTrie";
import HeaderBar from "./components/HeaderBar";
import { getTopKTrending } from "./utils/topKTrending";
import TrendingRow from "./components/TrendingRow";

import { useQuery } from "@apollo/client/react";
import { GET_VIDEOS } from "./graphql/queries";

import "./styles/main.scss";

interface GetVideosResponse {
  videos: {
    id: number;
    title: string;
    channel: string;
    views: number;
    cat: string;
    thumbnail: string;
  }[];
}

export default function FeedApp() {
  const { loading, error, data } = useQuery<GetVideosResponse>(GET_VIDEOS);

  // Memoize derived video list
  const videoList = useMemo(() => data?.videos ?? [], [data]);

  const [filtered, setFiltered] = useState(videoList);

  // rebuild trie whenever the actual list changes
  const trie = useMemo(() => {
    const t = new Trie();
    videoList.forEach((v) => t.insert(v.title));
    return t;
  }, [videoList]);

  useEffect(() => {
    setFiltered(videoList);
  }, [videoList]);

  const handleSearch = (query: string) => {
    if (!query) {
      setFiltered(videoList);
      return;
    }
    const matches = trie.searchPrefix(query);
    const newList = videoList.filter((v) =>
      matches.some((m) => v.title.toLowerCase() === m)
    );
    setFiltered(newList);
  };

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>Error loading videos: {error.message}</p>;

  return (
    <div className="feed-container">
      <HeaderBar onSearch={handleSearch} />
      <div className="feed-body">
        <TrendingRow data={getTopKTrending(videoList, 5)} />
        <section className="feed-grid">
          {filtered.map((v) => (
            <article key={v.id} className="card">
              <img src={v.thumbnail} alt={v.title} className="thumb" />
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
