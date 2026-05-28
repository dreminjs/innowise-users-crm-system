import { HttpLink } from "@apollo/client";

export const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_URL || "http://localhost:3001/api/graphql",
  //uri: "https://cv-project-js.inno.ws/api/graphql",
});
