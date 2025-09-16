<script setup>
// Seite ist öffentlich (wichtig für den Reset-Link aus der Mail)
definePageMeta({ public: true })

import { ref, computed } from 'vue'
import { kPage, kList, kListInput, kButton } from 'konsta/vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

// Form-States (simpel gehalten)
const newPassword = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const message = ref('')
const errorMsg = ref('')

// Einfache Validierungen
const minLen = 8
const passwordsMatch = computed(() => newPassword.value === confirmPassword.value)
const validLength = computed(() => newPassword.value.length >= minLen)
const canSubmit = computed(() => passwordsMatch.value && validLength.value && !loading.value)

async function updatePassword () {
  errorMsg.value = ''
  message.value = ''
  if (!passwordsMatch.value) {
    errorMsg.value = 'Passwörter stimmen nicht überein.'
    return
  }
  if (!validLength.value) {
    errorMsg.value = `Passwort muss mindestens ${minLen} Zeichen lang sein.`
    return
  }
  try {
    loading.value = true
    const { error } = await supabase.auth.updateUser({ password: newPassword.value })
    if (error) throw error
    message.value = 'Passwort erfolgreich aktualisiert. Du kannst dich jetzt einloggen.'
    // Optional: nach kurzer Zeit zum Login leiten
    setTimeout(() => navigateTo('/login'), 1000)
  } catch (e) {
    errorMsg.value = (e && typeof e.message === 'string') ? e.message : 'Unbekannter Fehler beim Aktualisieren.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <k-page class="flex items-center justify-center min-h-screen">
    <k-list inset-ios strong-ios class="w-full max-w-xl p-8">
      <title class="flex justify-center text-2xl">Passwort zurücksetzen</title>

      <k-list-input
        outline
        label="Neues Passwort"
        floating-label
        type="password"
        placeholder="Neues Passwort"
        v-model="newPassword"
      />

      <k-list-input
        outline
        label="Passwort bestätigen"
        floating-label
        type="password"
        placeholder="Passwort bestätigen"
        v-model="confirmPassword"
      />

      <!-- Hinweise / Fehler -->
      <div class="mt-2 text-sm">
        <p v-if="!validLength" class="text-red-600">Mindestens {{ minLen }} Zeichen.</p>
        <p v-else-if="!passwordsMatch" class="text-red-600">Passwörter stimmen nicht überein.</p>
        <p v-if="message" class="text-green-600">{{ message }}</p>
        <p v-if="errorMsg" class="text-red-600">{{ errorMsg }}</p>
      </div>

      <div class="flex justify-center mt-6">
        <k-button :disabled="!canSubmit" @click="updatePassword" raised class="w-64 h-12">
          {{ loading ? 'Speichere...' : 'Passwort speichern' }}
        </k-button>
      </div>

      <div class="flex justify-center mt-4">
        <NuxtLink to="/login" class="text-blue-600 hover:text-blue-800">Zurück zum Login</NuxtLink>
      </div>
    </k-list>
  </k-page>
</template>