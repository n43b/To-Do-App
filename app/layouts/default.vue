<template>
  <App theme="ios" :dark="true" class="">
    <slot />
  </App>
</template>

<script setup>
import { App } from 'konsta/vue'
</script>
