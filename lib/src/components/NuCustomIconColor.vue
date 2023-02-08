<script setup lang="ts">
import './nutzui.styl'
import { useSlots, ref } from 'vue'

const props = defineProps({
  icon: {
    type: Object,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
  isActive: {
    type: Function,
    required: false,
  },
  tp: {
    type: String,
    required: false,
  }
})

// const slots = useSlots()

const bgcolorpicker = ref(null)

const clickBgColorpicker = () => {
  // console.log('clickBgColorpicker')
  bgcolorpicker.value?.click()
}

const colorChanged = (c: any) => {
  // console.log('colorChanged', c)
  if (props.action) {
    props.action(c)
  }
}

defineExpose({
  clickedParent: () => {
    clickBgColorpicker()
  },
  getTp: () => {
    return props.tp
  }
})
</script>

<template>
  <div class="nux-custom-icon nu-flex nu-flex-col qqqnu-m-r-md">
    <div class="nux-marker nu-center-self-horz" @click="clickBgColorpicker">
      <!-- <svg class="remix">
        <use :xlink:href="`${remixiconUrl}#ri-mark-pen-line`" />
      </svg> -->
      <NuIcon :class="{ 'is-active': isActive ? isActive(): null }">
        <component :is="icon" />
      </NuIcon>
    </div>
    <input
      type="color"
      ref="bgcolorpicker"
      @input="colorChanged($event.target.value)"
      :value="color"
    >
  </div>
</template>

<style lang="stylus" scoped>
.nux-custom-icon
  width 32px
  height 32px
  display flex
  align-items: center;
  justify-content: center;

input[type="color"]
  -webkit-appearance: none;
  border: none;
  width: 16px;
  height: 4px;
  padding 0
  cursor pointer
input[type="color"]::-webkit-color-swatch-wrapper
  padding: 0;
input[type="color"]::-webkit-color-swatch
  border: none;

NuIcon, .nux-marker, .nux-marker svg
  width 16px
  height 16px
  cursor pointer
.nux-marker
  // margin-bottom 4px
  margin-bottom 2px
  // margin-top -3px

.is-active, :hover
    color: var(--nu-cl-focus)
</style>