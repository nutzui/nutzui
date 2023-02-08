<script setup lang="ts">
import { useSlots } from 'vue'
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'
// TODO Replace all Remix icons by own (svg) icons.

defineProps({
  icon: {
      // type: String,
      // required: true,
    },

    title: {
      type: String,
      // required: true,
    },

    action: {
      type: Function,
      // required: true,
    },

    isActive: {
      type: Function,
      default: null,
    },
})

const slots = useSlots()
</script>

<template>
  <template v-if="slots.icon">
    <slot name="icon"></slot>
  </template>

  <NuIcon
    v-else-if="typeof icon === 'object'"
    qqqclass="nux-main-menu-toggle nu-m-r-sm nu-clickable"
    :class="{ 'is-active': isActive ? isActive(): null }"
    @click="action"
    :title="title"
  >
    <component :is="icon" />
  </NuIcon>

  <button
    v-else
    class="menu-item"
    :class="{ 'is-active': isActive ? isActive(): null }"
    @click="action"
    :title="title"
  >
    <!-- <span v-html="SvgBold" /> -->
    <svg class="remix">
      <use :xlink:href="`${remixiconUrl}#ri-${icon}`" />
    </svg>
  </button>
</template>

<style lang="stylus" scoped>
NuIcon
  &.is-active,
    &:hover {
      color: var(--nu-cl-focus);
      // background-color: var(--nu-cl-focus);
    }

.menu-item {
  width: 1.75rem;
  height: 1.75rem;
  color: #0D0D0D;
  border: none;
  background-color: transparent;
  border-radius: 0.4rem;
  padding: 0.25rem;
  margin-right: 0.25rem;
  transition-duration: 0.1s;

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  &.is-active,
  &:hover {
    color: var(--nu-cl-focus);
    // background-color: var(--nu-cl-focus);
  }
}
</style>
