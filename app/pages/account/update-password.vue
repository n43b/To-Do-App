<template>
<k-page class="flex items-center justify-center min-h-screen">
    <k-list inset-ios strong-ios class="w-full max-w-2xl p-10">

        <div class="flex justify-center">
            <UserCircleIcon class="w-10 h-10 text-gray-600" />
        </div>

        <title class="flex justify-center text-3xl">Passwort Vergessen</title>

        
          
      <k-list-input
        outline
        label="Passwort"
        floating-label
        type="password"
        placeholder="Neues Passwort"
        :value="password"
        @input="password = $event.target.value"
      />
      <k-list-input
        outline
        label="Passwort Wiederholen"
        floating-label
        type="password"
        placeholder="Neues Passwort Wiederholen"
        :value="password2"
        @input="password2 = $event.target.value"
      >
        <div class="flex justify-center">
        <div class="px-4 flex items-center gap-1">

            <p class="text-sm">Zurück zum</p> 
            
            <k-button small clear 
            class="text-blue-500 hover:text-blue-800 w-9 h-3.6"
            @click="goLogin">
            <u>Login</u>
            </k-button>
        </div>
        </div>
      </k-list-input>

      <template v-if="passwordEqual">
        <br>
        <div class="flex justify-center">
          <k-button @click="requestResetPassword" raised class="w-60 h-11 text-xl">Passwort Zurücksetzten</k-button>
        </div>
        <br>
      </template>
      <template v-else>
        <br>
        <div class="flex justify-center">
          <k-button disabled raised class="w-60 h-11 text-xl">Passwort Zurücksetzten</k-button>
        </div>
        <br>
      </template>

      </k-list>
  </k-page>
</template>

<script setup>
 import {
    kList,
    kListInput,
    kPage,
    kNavbar,
    kNavbarBackLink,
    kButton,
    kBlock,
    kBlockTitle,
  } from 'konsta/vue';

import { ref, watch, computed } from 'vue'
import { UserCircleIcon, UserPlusIcon } from '@heroicons/vue/24/outline'

const supabase = useSupabaseClient()
const password = ref('')
const password2 = ref('')
const passwordEqual = computed(() => password.value.trim().length > 0 && password.value.trim() === password2.value.trim())

/*const user = useSupabaseUser()*/

function goLogin() {
  navigateTo('/login')
}

const requestResetPassword = async () => {
  const { data, error } = await supabase.auth.updateUser({ password: password.value })
  if (error) console.log(error)
  if (data) console.log(data)
    
  
}

/*watch(user, () => {
  if (user.value) {
      // Redirect to protected page
      return navigateTo('/')
  }
}, { immediate: true })*/

</script>