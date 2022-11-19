<script setup lang="ts">
import './nutzui.styl'
</script>

<template>
  <div class="n-dashboard nu-flex">
    <!--Sidebar Left-->
    <aside class="flex-none">
      <slot name="leftsidebar">
        <!-- Left sidebar goes here... -->
      </slot>
    </aside>

    <section class="nu-flex-grow nu-flex nu-flex-col">
      <!--Topbar-->
      <header class="">
        <slot name="topbar">
          <!-- Topbar goes here... -->
        </slot>
      </header>

      <!--Content-->
      <article class="nu-flex nu-flex-grow nu-p-lg">
        <slot>
          <!-- Content goes here ... -->
        </slot>
      </article>

      <!--Bottombar-->
      <footer class="">
        <slot name="bottombar">
          <!-- Bottombar goes here... -->
        </slot>
      </footer>
    </section>

    <!--Sidebar Right-->
    <aside class="flex-none">
      <slot name="rightsidebar">
        <!-- Right sidebar goes here... -->
      </slot>
    </aside>
  </div>
</template>

<style lang="stylus" scoped>
.n-dashboard
//  background-color #f05
//  color var(--nu-cl-bg)
  width 100%
  height 100%
  overflow hidden
  margin 0 auto
  // box-shadow rgba(127, 127, 127, 0.06) 32px 0px 32px
  // box-shadow rgba(127, 127, 127, 0.06) -32px 0px 32px
  box-shadow rgba(127, 127, 127, 0.06) 32px 0px 32px, rgba(127, 127, 127, 0.06) -32px 0px 32px

header
  // background-color #0f4
  // box-shadow inset 0 0 0 4px #f4f4f4
  // box-shadow rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px
  // box-shadow rgba(0, 0, 0, 0.3) 0px 3px 6px
  // box-shadow rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px
  // box-shadow rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px
  // box-shadow rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px
  // box-shadow rgba(0, 0, 0, 0.16) 0px -3px 6px, rgba(0, 0, 0, 0.23) 0px -3px 6px
  // box-shadow rgba(0, 0, 0, 0.03) 0px 0px 16px
  box-shadow rgba(127, 127, 127, 0.08) 0px 0px 20px
  // box-shadow 0 4px 2px -2px gray

footer
  // background-color #0f4
  // box-shadow inset 0 0 0 4px #f4f4f4
  // box-shadow rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px
  // box-shadow rgba(0, 0, 0, 0.3) 0px 3px 6px
  // box-shadow rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px
  // box-shadow rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px
  // box-shadow rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px
  // box-shadow rgba(0, 0, 0, 0.16) 0px -3px 6px, rgba(0, 0, 0, 0.23) 0px -3px 6px
  // box-shadow rgba(0, 0, 0, 0.03) 0px 0px 16px
  box-shadow rgba(168, 168, 168, 0.08) 0px -20px 20px
  // box-shadow 0 4px 2px -2px gray
</style>
