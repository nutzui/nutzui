<script setup lang="ts">
import './nutzui.styl'

defineProps<{
  title: string
}>()
</script>

<template>
  <button>
    {{ title }}
  </button>
</template>

<style lang="stylus" scoped>
</style>
