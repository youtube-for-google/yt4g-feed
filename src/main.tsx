import React from "react";
import ReactDOM from "react-dom/client";
import FeedApp from "./FeedApp";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./graphql/client";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <FeedApp />
    </ApolloProvider>
  </React.StrictMode>
);
