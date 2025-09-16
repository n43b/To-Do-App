/// <reference types="nuxt" />
// Nuxt auto-imports composables (e.g., useSupabaseUser), no explicit import needed.
declare const useSupabaseUser: () => { value: unknown }
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'

export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  // Öffentliche Seiten (ohne Login erreichbar)
  const publicPaths = [
    '/login',
    '/account/update-password',
    '/confirm'
    // '/confirm', // Nur nötig, wenn du Supabase Email-Confirm/Magic Link nutzt
  ]

  // Seiten mit definePageMeta({ public: true }) immer erlauben
  const isPublic = (to.meta as Record<string, any>)?.public
  if (isPublic) return

  // Pfad ist öffentlich (auch Unterpfade erlaubt)
  if (publicPaths.some((p) => to.path.startsWith(p))) return

  // Alle anderen Routen benötigen Login
  if (!user.value) {
    return navigateTo('/login')
  }
})