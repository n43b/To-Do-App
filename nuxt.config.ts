// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ["@nuxtjs/supabase", "@nuxt/icon"],

  css: ['~/assets/css/main.css'],

 

  build: {
      transpile:["konsta"]
  },

  ssr: false,
  components: true,

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  redirectOptions: {
    login: '/login',
    callback: '/confirm',
    include: undefined,
    exclude: ['/index'],
    saveRedirectToCookie: false,
  },


})