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
  // console.log('setTopOpacity', box.value?.scrollTop)
  const v = getV(box.value?.scrollTop)
  top.value.style.opacity = v
  box.value.style.webkitMaskImage = box.value.style.maskImage = 'linear-gradient(to bottom, rgba(0, 0, 0, ' + (1 - v) + ') 0px, black 50px)'
  // console.log('setTopOpacity 222', v, box.value.style.webkitMaskImage)
}

const setBottomOpacity = () => {
  // console.log('setTopOpacity', box.value?.offsetTop)
  const v = getV(box.value?.scrollHeight - box.value?.scrollTop - box.value?.clientHeight)
  bottom.value.style.opacity = v
  box2.value.style.webkitMaskImage = box2.value.style.maskImage = 'linear-gradient(to top, rgba(0, 0, 0, ' + (1 - v) + ') 0px, black 50px)'
  box2.value.style.webkitMaskPosition = box2.value.style.maskPosition = '0 ' + (box.value?.clientHeight - 0) + 'px'
  // console.log('setBottomOpacity 222', v, box2.value.style.webkitMaskPosition)
}

onMounted(() => {
  console.log('onMounted', box.value.style)
  box.value?.addEventListener('scroll', () => {
    // cont.animate({scrollTop: cont.scrollTop() + (el.offset().top - cont.offset().top)});
    // console.log('scroll', top.value?.offsetTop)
    // top.value.style.opacity = top.value?.offsetTop / 100
    setTopOpacity()
    setBottomOpacity()
  })

  setTopOpacity()
  setBottomOpacity()

  // // box.value.style.maskImage = 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))'
  // box.value.style.maskImage = 'linear-gradient(to bottom, transparent 0px, black 70px)'
  // box.value.style.webkitMaskImage = 'linear-gradient(to bottom, transparent 0px, black 70px)'
  // console.log('onMounted 222', box.value.style)
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
        <ul class="nu-m-vert-md nu-p-vert-md">
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
        </ul>
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

  <!-- Mask definition -->
  <defs>
    <mask id="mask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
      <linearGradient id="g" gradientUnits="objectBoundingBox" x2="0" y2="1">
        <stop stop-color="white" stop-opacity="1" offset="0" />
        <stop stop-color="white" stop-opacity="0" offset="1" />
      </linearGradient>
      <rect width="320px" height="200px" fill="url(#g)" />
    </mask>
  </defs>
</template>

<style lang="stylus" scoped>
.nu-box-overlay
  // background-color rgba(0, 0, 255, 0.5)
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
  // background-color white
  position absolute
  top 0
  // background linear-gradient(white 0%, transparent)
  // -webkit-mask-image: -webkit-gradient(
  //       linear,
  //       left 50%,
  //       left bottom,
  //       from(rgba(0,0,0,1)),
  //       to(rgba(0,0,0,0))
  //   );
  // mask: url(#mask)
  // -webkit-mask-image: linear-gradient(to bottom, black 0px, transparent 70px)
  // mask-image: linear-gradient(to bottom, black 0px, transparent 70px)
  .nux-arrow
    margin-top -15px
    transform: scaleY(-1)

.nu-scr-bottom
  width 100%
  height var(--nu-scroll-container-gradient-height)
  // background-color red
  position absolute
  bottom 0
  // background linear-gradient(transparent, white 100%)
  .nux-arrow
    margin-top 15px

// .nu-sb-box2
//   -webkit-mask-position: bottom
//   mask-position: bottom

// .nu-scrollbox
//   // -webkit-mask-image: linear-gradient(to bottom, black 0px, transparent 70px)
//   // mask-image: linear-gradient(to bottom, black 0px, transparent 70px)
//   -webkit-mask-image: linear-gradient(to bottom, transparent 0px, black 70px)
//   mask-image: linear-gradient(to bottom, transparent 0px, black 70px)

// .nu-scrollbox {
//   // overflow: auto;
//   float: left;
//   width: 200px;
//   height: 150px;
//   margin: 0px 20px;
//   font-size: 16px;
//   background:
//     linear-gradient(red 30%, transparent),
//     linear-gradient(transparent, white 70%) 0 100%,
//     radial-gradient(farthest-side at 50% 0, rgba(63, 185, 6, 0.5), transparent),
//     radial-gradient(farthest-side at 50% 100%, rgba(63, 185, 6, 0.5), transparent) 0 100%;
//   background-repeat: no-repeat;
//   background-color: white;
//   background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px;
//   /* Opera doesn't support this in the shorthand */
//   background-attachment: local, local, scroll, scroll;
//   position: relative;
//   border: 1px solid gray;
// }

// .nu-scrollbox::before {
//   content: "scroll up";
//   display: block;
//   width: 100%;
//   position: sticky;
//   top: 0;
//   text-align: center;
//   font-size: 0.5rem;
//   height: 0.6rem;
// }

// .nu-scrollbox::after {
//   content: "scroll down";
//   display: block;
//   width: 100%;
//   position: sticky;
//   bottom: 0;
//   text-align: center;
//   font-size: 0.5rem;
//   height: 0.6rem;
// }

// ul::before {
//   content: "";
//   width: 50%;
//   background-color: white;
//   position: absolute;
//   top: 0;
//   z-index: 100;
//   height: 0.6rem;
// }

// ul::after {
//   content: "";
//   width: 100%;
//   background-color: white;
//   position: absolute;
//   left: 0;
//   z-index: 100;
//   height: 0.6rem;
// }

// .nu-scrollbox {
//   // overflow: auto;
//   // width: 200px;
//   // height: 200px;
//   // margin: 0px 10px;
//   background: 
//     linear-gradient(red 30%, transparent),
//     linear-gradient(transparent, red 70%) 0 100%,
//     url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='1rem' width='100%'><text x='50%' y='10' fill='green' font-size='0.7rem' text-align='center'>scroll up</text></svg>"), url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='1rem' width='100%'><text x='50%' y='10' fill='green' font-size='0.7rem' text-align='center'>scroll down</text></svg>") 0 100%;
//   background-repeat: no-repeat;
//   background-color: white;
//   background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px;
//   /* Opera doesn't support this in the shorthand */
//   background-attachment: local, local, scroll, scroll;
//   // border: 1px solid gray;
//   // float: left;
// }
</style>
