import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["esm"], // Since your project uses "type": "module"
  splitting: false,
  sourcemap: true,
  clean: true, // Cleans the dist folder before each build
  minify: true, // Minify the output for production
  outDir: "dist",
});
