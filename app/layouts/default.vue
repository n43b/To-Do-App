<template>
  <App theme="ios" :dark="false">
    <slot />
  </App>
</template>

<script setup>
import { App } from 'konsta/vue'
</script>