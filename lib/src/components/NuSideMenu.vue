<script setup lang="ts">
import './nutzui.styl'
import NuIconChevronRight from './icons/NuIconChevronRight.vue'

defineProps({
  title: String,
})

const emit = defineEmits(['go-back'])
</script>

<template>
  <div class="nu-flex nu-flex-col nu-m-xl nu-mt-lg">
    <div class="nu-flex nu-center-vert nu-m-b-md">
      <h1>
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

    <menu class="nu-side-menu nu-flex nu-flex-col">
      <slot />
    </menu>
  </div>
</template>

<style lang="stylus" scoped>
.nux-close
  margin-right calc(-1 * var(--nu-sz-lg))
</style>
