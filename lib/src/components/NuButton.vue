<script setup lang="ts">
import './nutzui.styl'
import { useSlots } from 'vue'

defineProps({
  title: String,
  tag: {
      type: String,
      required: false,
      default: 'button'
  },
  type: {
    type: String,
    default: 'text'
  }
})

const slots = useSlots()
</script>

<template>
  <component
    :is="tag"
    class="nu-flex nu-center-vert nu-center-horz"
    :type="type"
  >
    <NuIcon v-if="slots.icon" class="nu-m-r-sm">
      <slot name="icon"></slot>
    </NuIcon>
    {{ title }}
  </component>
</template>
