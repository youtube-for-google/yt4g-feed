export default function FeedApp() {
  const dummyVideos = [
    { id: 1, title: "Building microfrontends", views: 54200 },
    { id: 2, title: "Intro to OpenTelemetry", views: 33800 },
    { id: 3, title: "Heap Sort in action", views: 20900 },
  ];

  return (
    <main style={{ padding: "1rem", color: "#fff", background: "#0f0f0f" }}>
      <h1>YT4G Feed</h1>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1rem",
        }}
      >
        {dummyVideos.map((v) => (
          <article
            key={v.id}
            style={{
              border: "1px solid #333",
              borderRadius: "8px",
              padding: "1rem",
              background: "#202020",
            }}
          >
            <h3>{v.title}</h3>
            <p>{v.views.toLocaleString()} views</p>
          </article>
        ))}
      </section>
    </main>
  );
}
