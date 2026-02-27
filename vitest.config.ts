import { defineConfig } from "vitest/config"
import path from "path"

export default defineConfig({
  test: {
    environment: "node"
  },
  resolve: {
    alias: {
      "~/shared/store/list.store": path.resolve(__dirname, "./src/shared/store/list.store.ts"),
      "~": path.resolve(__dirname, "./src"),
      "@": path.resolve(__dirname, "./src")
    }
  }
})
