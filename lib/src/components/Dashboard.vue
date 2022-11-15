<script setup lang="ts">
import './nutzui.styl'
</script>

<template>
  <div class="n-dashboard nu-flex">
    <!--Sidebar Left-->
    <div class="flex-none">
      <slot name="leftsidebar">
        <!-- Left sidebar goes here... -->
      </slot>
    </div>

    <div class="nu-flex-grow nu-flex nu-flex-col">
      <!--Topbar-->
      <div class="">
        <slot name="topbar">
          <!-- Topbar goes here... -->
        </slot>
      </div>

      <!--Content-->
      <div class="nu-flex-grow">
        <slot>
          <!-- Content goes here ... -->
        </slot>
      </div>

      <!--Bottombar-->
      <div class="">
        <slot name="bottombar">
          <!-- Bottombar goes here... -->
        </slot>
      </div>
    </div>

    <!--Sidebar Right-->
    <div class="flex-none">
      <slot name="rightsidebar">
        <!-- Right sidebar goes here... -->
      </slot>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.n-dashboard
  background-color #f05
  color var(--nu-cl-bg)
  width 100%
  height 100%
  overflow hidden
  margin 0 auto
</style>
