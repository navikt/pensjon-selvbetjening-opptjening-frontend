const concurrently = require("concurrently");

const filename = process.argv[2] || "mock.json";

concurrently(
  [
    {
      command: "pnpm start",
      name: "frontend",
      prefixColor: "blue",
    },
    {
      command: `json-server --port 4000 --watch dev/${filename}`,
      name: "mock",
      prefixColor: "magenta",
    },
  ],
  {
    killOthers: ["failure", "success"],
  },
);