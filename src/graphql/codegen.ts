import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3001/api/graphql",
  documents: "src/**/*.{ts,tsx}",
  generates: {
    "src/graphql/": {
      preset: "client",
    },
  },
};

export default config;
