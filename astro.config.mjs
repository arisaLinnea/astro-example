import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import netlify from "@astrojs/netlify/functions";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [tailwind(), mdx(), react(), svelte()],
  adapter: node(),
});
