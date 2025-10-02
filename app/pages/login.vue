<template>
<k-page class="flex items-center justify-center">
    <div v-if="showWindows===1">
    <k-list inset-ios strong-ios class="max-w-2xl p-15">

        <div class="flex justify-center">
        <UserCircleIcon class="w-10 h-10 text-gray-600" />
        </div>

        <title class="flex justify-center text-3xl">Login</title>
        <br>
        
        <template class="flex justify-center">
        <k-button @click="signInWithGitHub" class="bg-blue-950 w-45"><Icon name="uil:github" style="color: white" size="2em"/>&nbsp;GitHub</k-button>
        </template>

        <p>_____________________________</p>
   
      <k-list-input
        outline
        label="Email"
        floating-label
        type="email"
        placeholder="Email"
      >
        
      </k-list-input>

      <k-list-input
        outline
        label="Passwort"
        floating-label
        type="password"
        placeholder="Passwort"
      >
        
      </k-list-input>
        <k-button
          clear
          class="text-black hover:text-blue-800"
          @click="showWindows=3"
        >
          <u>Passwort Vergessen?</u>
        </k-button>

        <br>
        <div class="flex justify-center">
          <k-button @click="signIn" raised class="w-60 h-11 text-xl">Login</k-button>
        </div>
        <br> 

        
        <div class="px-4 flex items-center gap-1">

            <p class="text-sm">Noch kein Account?</p> 
            
            <k-button small clear 
            class="text-blue-500 hover:text-blue-800 w-21 h-3.6"
            @click="showWindows=2">
            <u>Registrieren.</u>
            </k-button>
        </div>
        
    </k-list>
    </div>

    <div v-else-if="showWindows===2">
        <k-list inset-ios strong-ios class="max-w-2xl p-15">

        <div class="flex justify-center">
            <UserCircleIcon class="w-10 h-10 text-gray-600" />
        </div>

        <title class="flex justify-center text-3xl">Registrierung</title>

        
          
      <k-list-input
        outline
        label="Email"
        floating-label
        type="email"
        placeholder="Email"
      >
        
      </k-list-input>

      <k-list-input
        outline
        label="Passwort"
        floating-label
        type="password"
        placeholder="Passwort"
      >
        
      </k-list-input>
      <k-button
          clear
          class="text-black hover:text-blue-800"
          @click="showWindows=3"
        >
          <u>Passwort Vergessen?</u>
        </k-button>

        <br>
        <div class="flex justify-center">
          <k-button @click="signUpWithPassword" raised class="w-60 h-11 text-xl">Registrieren</k-button>
        </div>
        <br>

        <div class="px-4 flex items-center gap-1">

            <p class="text-sm">Schon einen Account?</p>

            <k-button small clear 
            class="text-blue-500 hover:text-blue-800 w-10 h-3.6"
            @click="showWindows=1">
            <u>Login.</u>
            </k-button>

        </div>
        
    </k-list>
    </div>

    <div v-else-if="showWindows===3">
      <k-list inset-ios strong-ios class="max-w-2xl p-15">

        <div class="flex justify-center">
            <UserCircleIcon class="w-10 h-10 text-gray-600" />
        </div>

        <title class="flex justify-center text-3xl">Passwort Vergessen</title>

        
          
      <k-list-input
        outline
        label="Email"
        floating-label
        type="email"
        placeholder="Deine Email"
      >
      
      <div class="flex justify-center">
        <div class="px-4 flex items-center gap-1">

            <p class="text-sm">Zurück zum</p> 
            
            <k-button small clear 
            class="text-blue-500 hover:text-blue-800 w-9 h-3.6"
            @click="showWindows=1">
            <u>Login</u>
            </k-button>
        </div>
        </div>

        <br>
        <div class="flex justify-center">
          <k-button @click="requestResetPassword" raised class="w-60 h-11 text-xl">Login</k-button>
        </div>
        <br> 
      </k-list-input>
      </k-list>
    </div>
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

import { ref, watch } from 'vue'
import { UserCircleIcon, UserPlusIcon } from '@heroicons/vue/24/outline'
   
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const user = useSupabaseUser()

async function signIn() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
    options: {
      emailRedirectTo: 'https://nuxt-todo-app-v1.vercel.app/confirm',
   },
  })
  if (error) {
    console.log('Registrierung fehlgeschlagen:', error.message)
  } else {
    console.log('Registrierung erfolgreich:', data)
  }
}

const requestResetPassword = async () => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: 'https://nuxt-todo-app-v1.vercel.app/account/update-password',
  })
  if (error) console.log(error)
}

const signInWithGitHub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'github',
  url: 'https://nuxt-todo-app-v1.vercel.app/'
  })
  if (error) {
    console.log('Registrierung fehlgeschlagen:', error.message)
  } else {
    console.log('Registrierung erfolgreich:', data)
  }
}

watch(user, () => {
  if (user.value) {
      // Redirect to protected page
      return navigateTo('/')
  }
}, { immediate: true })


const signUpWithPassword = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      emailRedirectTo: 'https://nuxt-todo-app-v1.vercel.app/confirm',
    },
  })
  if (error) {
    console.log('Registrierung fehlgeschlagen:', error.message)
  } else {
    console.log('Registrierung erfolgreich:', data)
  }
}


const showWindows = ref(1)

  
</script>