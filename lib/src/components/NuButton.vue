<script setup lang="ts">
import './nutzui.styl'
import { useSlots } from 'vue'

defineProps({
  title: String,
  tag: { type: String, required: false, default: 'button' }
})

const slots = useSlots()
</script>

<template>
  <component :is="tag" class="nu-flex nu-center-vert nu-center-horz">
    <NuIcon v-if="slots.icon" class="nu-m-r-sm">
      <slot name="icon"></slot>
    </NuIcon>
  {{ title }}
  </component>
</template>
