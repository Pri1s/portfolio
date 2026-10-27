import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const resumeVersion = createHash("sha256")
  .update(readFileSync(new URL("./public/priyansu-biswal-resume.pdf", import.meta.url)))
  .digest("hex")
  .slice(0, 12);

export default defineConfig({
  base: "/",
  define: {
    __RESUME_VERSION__: JSON.stringify(resumeVersion),
  },
  build: {
    outDir: "docs",
  },
  plugins: [react()],
});
