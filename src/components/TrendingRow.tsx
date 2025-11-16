import { VideoItem } from "../utils/topKTrending";
import "../styles/trending.scss";

export default function TrendingRow({ data }: { data: VideoItem[] }) {
  return (
    <section className="trending">
      <h2>🔥 Trending</h2>
      <div className="trending-scroll">
        {data.map((v) => (
          <article key={v.id} className="trend-card">
            <h4>{v.title}</h4>
            <p>{v.views.toLocaleString()} views</p>
          </article>
        ))}
      </div>
    </section>
  );
}
