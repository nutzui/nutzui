<script setup lang="ts">
import './nutzui.styl'
import { useSlots, ref, computed } from 'vue'
import { paragraphTypeToName } from '@nutzui/nutzui/helpers/paragraph'

const props = defineProps({
  icon: {
    type: Object,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  tp: {
    type: String,
    required: false,
  }
})

// const slots = useSlots()

const paragraphName = computed(() => {
  return paragraphTypeToName(props.value)
})
defineExpose({
  clickedParent: () => {
    // clickBgColorpicker()
  },
  getTp: () => {
    return props.tp
  }
})
</script>

<template>
  <div class="nux-para">
    {{ paragraphName }}
  </div>
  <!-- <NuIcon class="nux-arrow-dropdown">
    <NuIconArrowDropdown />
  </NuIcon> -->
</template>

<style lang="stylus" scoped>
.nux-para
  color #999
  cursor pointer
  height 32px
  text-align: center
  line-height: 32px
  word-break none
  white-space: nowrap
  text-overflow: ellipsis
  overflow: hidden
  &:hover
    color var(--nu-cl-focus)
</style>