<script setup lang="ts">
import { ref, onMounted } from 'vue'
import './nutzui.styl'

import NuIconArrowDropdown from '@nutzui/nutzui/components/icons/NuIconArrowDropdown.vue'

const box = ref(null)
const box2 = ref(null)
const top = ref(null)
const bottom = ref(null)

const getV = (v0: number) => {
  let v = v0
  v /= 100
  if (v < 0) {
    v = 0
  }
  if (v > 1) {
    v = 1
  }
  return v
}

const setTopOpacity = () => {
  const v = getV(box.value?.scrollTop)
  top.value.style.opacity = v
  box.value.style.webkitMaskImage = box.value.style.maskImage = 'linear-gradient(to bottom, rgba(0, 0, 0, ' + (1 - v) + ') 0px, black 100px)'
}

const setBottomOpacity = () => {
  const v = getV(box.value?.scrollHeight - box.value?.scrollTop - box.value?.clientHeight)
  bottom.value.style.opacity = v
  box2.value.style.webkitMaskImage = box2.value.style.maskImage = 'linear-gradient(to top, rgba(0, 0, 0, ' + (1 - v) + ') 0px, black 100px)'
  box2.value.style.webkitMaskPosition = box2.value.style.maskPosition = '0 ' + (box.value?.clientHeight - 0) + 'px'
}

onMounted(() => {
  console.log('onMounted', box.value.style)
  box.value?.addEventListener('scroll', () => {
    setTopOpacity()
    setBottomOpacity()
  })

  setTopOpacity()
  setBottomOpacity()
})
</script>

<template>
  <div class="nu-relative nu-w-full nu-h-full nu-overflow-hidden">
    <div class="nu-box-overlay nu-absolute qqqnu-w-full qqqnu-h-full">
      <div class="nu-scr-top" ref="top">
        <NuIcon class="nux-arrow nu-m-auto">
          <NuIconArrowDropdown />
        </NuIcon>
      </div>
      <div class="nu-scr-bottom" ref="bottom">
        <NuIcon class="nux-arrow nu-m-auto">
          <NuIconArrowDropdown />
        </NuIcon>
      </div>
    </div>
    <div class="nu-sb-box2 nu-h-full" ref="box2">
      <div class="nu-scrollbox nu-h-full nu-overflow-y-auto" ref="box">
        <!-- <ul class="nu-m-vert-md nu-p-vert-md">
          <li>bla bal bla blabala bla 1</li>
          <li>bla bal bla blabala bla 2</li>
          <li>bla bal bla blabala bla 3</li>
          <li>bla bal bla blabala bla 4</li>
          <li>bla bal bla blabala bla 5</li>
          <li>bla bal bla blabala bla 6</li>
          <li>bla bal bla blabala bla 7</li>
          <li>bla bal bla blabala bla 8</li>
          <li>bla bal bla blabala bla 9</li>
          <li>bla bal bla blabala bla 10</li>
          <li>bla bal bla blabala bla 1</li>
          <li>bla bal bla blabala bla 2</li>
          <li>bla bal bla blabala bla 3</li>
          <li>bla bal bla blabala bla 4</li>
          <li>bla bal bla blabala bla 5</li>
          <li>bla bal bla blabala bla 6</li>
          <li>bla bal bla blabala bla 7</li>
          <li>bla bal bla blabala bla 8</li>
          <li>bla bal bla blabala bla 9</li>
          <li>bla bal bla blabala bla 10</li>
          <li>bla bal bla blabala bla 1</li>
          <li>bla bal bla blabala bla 2</li>
          <li>bla bal bla blabala bla 3</li>
          <li>bla bal bla blabala bla 4</li>
          <li>bla bal bla blabala bla 5</li>
          <li>bla bal bla blabala bla 6</li>
          <li>bla bal bla blabala bla 7</li>
          <li>bla bal bla blabala bla 8</li>
          <li>bla bal bla blabala bla 9</li>
          <li>bla bal bla blabala bla 10</li>
          <li>bla bal bla blabala bla 1</li>
          <li>bla bal bla blabala bla 2</li>
          <li>bla bal bla blabala bla 3</li>
          <li>bla bal bla blabala bla 4</li>
          <li>bla bal bla blabala bla 5</li>
          <li>bla bal bla blabala bla 6</li>
          <li>bla bal bla blabala bla 7</li>
          <li>bla bal bla blabala bla 8</li>
          <li>bla bal bla blabala bla 9</li>
          <li>bla bal bla blabala bla 10</li>
        </ul> -->
        <slot />
        <!-- <ul>
          <li>bla bal bla blabala bla 1</li>
          <li>bla bal bla blabala bla 2</li>
          <li>bla bal bla blabala bla 3</li>
          <li>bla bal bla blabala bla 4</li>
          <li>bla bal bla blabala bla 5</li>
          <li>bla bal bla blabala bla 6</li>
          <li>bla bal bla blabala bla 7</li>
          <li>bla bal bla blabala bla 8</li>
          <li>bla bal bla blabala bla 9</li>
          <li>bla bal bla blabala bla 10</li>
        </ul> -->
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.nu-box-overlay
  z-index 1000
  top 0
  bottom 0
  left 0
  right 0
  pointer-events none
  .nux-arrow, .nux-arrow svg
    width 50px !important
    height 50px !important
    color #bbb

.nu-scr-top
  width 100%
  height var(--nu-scroll-container-gradient-height)
  position absolute
  top 0
  .nux-arrow
    margin-top -15px
    transform: scaleY(-1)

.nu-scr-bottom
  width 100%
  height var(--nu-scroll-container-gradient-height)
  position absolute
  bottom 0
  .nux-arrow
    margin-top 65px
</style>
