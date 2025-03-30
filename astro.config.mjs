// @ts-check
import { defineConfig, envField } from 'astro/config';
import { loadEnv } from "vite";
import vue from '@astrojs/vue';
// const { MS_TID } = loadEnv(process.env.MS_TID, process.cwd(), "");
// https://astro.build/config
export default defineConfig({
  integrations: [vue({jsx:true})],
  env:{
    schema: {
      MS_TID: envField.string({ context: "client", access: "public", optional: true }),
    },
    
  },
  
});