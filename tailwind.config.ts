import type { Config } from "tailwindcss";

// Colors are references to the CSS variables defined in app/globals.css, which mirror
// DESIGN.md Section 2 exactly. Never introduce a raw hex here or in a component — add the
// token to globals.css :root and reference it from this map.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "var(--bg-base)",
        panel: "var(--bg-panel)",
        leaf: "var(--accent-leaf)",
        soil: "var(--accent-soil)",
        sky: "var(--accent-sky)",
        wheat: "var(--accent-wheat)",
        ink: "var(--text-primary)",
        paper: "var(--text-inverse)",
      },
      fontFamily: {
        // "OS" voice (chrome) and "document" voice (content) — DESIGN.md Section 3.
        ui: ["var(--font-ui)", "sans-serif"],
        content: ["var(--font-content)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
