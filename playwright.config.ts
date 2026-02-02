import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  use: {
    headless: true,
    viewport: { width: 1440, height: 900 },
    baseURL: "http://localhost:5173",
  },
});
