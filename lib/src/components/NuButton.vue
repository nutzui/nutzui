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
  icon: {
      type: Object,
      required: false,
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
    <NuIcon v-if="slots.icon" class="nu-m-r-md">
      <slot name="icon"></slot>
    </NuIcon>
    <NuIcon v-if="icon" class="nu-m-r-md">
      <component :is="icon" />
    </NuIcon>
    {{ title }}
    <NuGrow />
    <NuIcon v-if="slots.iconright" class="nu-m-l-md">
      <slot name="iconright"></slot>
    </NuIcon>
  </component>
</template>
