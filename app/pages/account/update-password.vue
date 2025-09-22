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
        placeholder="Neue Passwort"
      >

        <k-button
          clear
          class="text-black hover:text-blue-800"
          @click="goLogin"
        >
          <u>Login</u>
        </k-button>

        <br>
        <div class="flex justify-center">
          <k-button @click="requestResetPassword" raised class="w-60 h-11 text-xl">Login</k-button>
        </div>
        <br> 
      </k-list-input>
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

import { ref, watch } from 'vue'
import { UserCircleIcon, UserPlusIcon } from '@heroicons/vue/24/outline'

const supabase = useSupabaseClient()
const password = ref('testtest2')
/*const user = useSupabaseUser()*/

function goLogin() {
  navigateTo('/login')
}

const requestResetPassword = async () => {
  const { data, error } = await supabase.auth.updateUser({ password: password.value })
  if (error) console.log(error)
}

/*watch(user, () => {
  if (user.value) {
      // Redirect to protected page
      return navigateTo('/')
  }
}, { immediate: true })*/

</script>