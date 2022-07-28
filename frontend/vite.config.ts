import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => {
      return {
        ...prev,
        ["process.env." + key]: `"${val}"`,
      };
    },
    {}
  );
  return defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: "jsdom",
    },
    resolve: {
      alias: {
        src: path.resolve("src/"),
      },
    },
    define: envWithProcessPrefix,
  });
};
