<script setup lang="ts">
import './nutzui.styl'
import { useSlots } from 'vue'

defineProps<{
  title: string
}>()

const slots = useSlots()
</script>

<template>
  <button class="nu-flex nu-center-vert nu-center-horz">
    <NuIcon v-if="slots.icon" class="nu-m-r-sm">
      <slot name="icon"></slot>
    </NuIcon>
  {{ title }}
  </button>
</template>

<style lang="stylus" scoped>
</style>
