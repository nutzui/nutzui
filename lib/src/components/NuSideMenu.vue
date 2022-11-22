<script setup lang="ts">
import './nutzui.styl'

defineProps({
  title: String,
})
</script>

<template>
  <div class="nu-flex nu-flex-col nu-m-xl nu-mt-lg">
    <h1 class="nu-mb-md">
      {{ title }}
    </h1>

    <menu class="nu-side-menu nu-flex nu-flex-col">
      <slot />
    </menu>
  </div>
</template>
