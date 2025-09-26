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
  supabase:{
  redirectOptions: {
    login: '/login',
    callback: '/confirm',
    include: undefined,
    exclude: ['/index', '/account/update-password'],
    saveRedirectToCookie: false,
  },
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/favicon.png' } // optional für iOS/Apple
      ]
    }
  }


})