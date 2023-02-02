<script setup lang="ts">
import './nutzui.styl'
import NuIconChevronRight from './icons/NuIconChevronRight.vue'

defineProps({
  title: String,
})

const emit = defineEmits(['go-back'])
</script>

<template>
  <div class="nu-flex nu-flex-col">
    <div class="nux-sidebar-header nu-p-md nu-p-horz-lg nu-flex nu-center-vert nu-m-b-md">
      <h1 class="nu-m-l-sm">
        {{ title }}
      </h1>

      <NuGrow />

      <NuIcon
        class="nu-clickable nux-close"
        @click="emit('go-back')"
      >
        <NuIconChevronRight />
      </NuIcon>
    </div>

    <menu class="nu-side-menu nu-p-md nu-p-horz-lg nu-flex nu-flex-col">
      <slot />
    </menu>
  </div>
</template>

<style lang="stylus" scoped>
.nux-sidebar-header
  box-shadow rgba(127, 127, 127, 0.08) 0px 0px 20px

.nux-close
  margin-right calc(-1 * var(--nu-sz-md))

.nu-side-menu
  :deep(NuIcon)
    color #999
</style>
