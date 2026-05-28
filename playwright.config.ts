import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: true,
    navigationTimeout: 10000,
    actionTimeout: 10000,
  },
  projects: [
    {
      name: "admin-setup",
      testMatch: /.*admin\.setup\.ts/,
      use: {
        storageState: undefined,
      },
    },
    {
      name: "user-setup",
      testMatch: /.*user\.setup\.ts/,
      use: {
        storageState: undefined,
      },
    },
    {
      name: "admin",
      testDir: "./tests/admin",
      dependencies: ["admin-setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/admin.json",
      },
    },
    {
      name: "user",
      testDir: "./tests/user",
      dependencies: ["user-setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
