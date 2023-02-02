<script setup lang="ts">
import { getEditorToolbarDef } from './NuEditorToolbarSettings'
import MenuItem from './NuToolbarItem.vue'
import { ref } from 'vue'
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'
// TODO Replace all Remix icons by own (svg) icons.

import NuIconArrowDropdown from '@nutzui/nutzui/components/icons/NuIconArrowDropdown.vue'
import NuIconMore from '@nutzui/nutzui/components/icons/NuIconMore.vue'

const props = defineProps({
  editor: {
    type: Object,
    required: true,
  },
  showadvanced: Boolean,
})

const emit = defineEmits(['editor-more'])

const colorpicker = ref(null)
const bgcolorpicker = ref(null)

const clickColorpicker = () => {
  colorpicker.value?.[0]?.click()
}

const clickBgColorpicker = () => {
  bgcolorpicker.value?.[0]?.click()
}

const toggleHeading = () => {
  if (props.editor.isActive('heading')) {
    props.editor.chain().focus().setParagraph().run()
  } else {
    props.editor.chain().focus().toggleHeading({ level: 1 }).run()
  }
}

const items = getEditorToolbarDef(props.editor)
</script>

<template>
  <div class="nux-tb-container nu-flex nu-overflow-hidden">
    <div class="nux-tb-inner-container nu-flex nu-overflow-hidden">
      <div v-for="(group, grindex) in items" :key="`gr_${grindex}`" class="nux-tb-group">
        <template v-if="(group.advanced || false) === showadvanced || showadvanced">
          <div class="divider" :key="`grdivider${grindex}`" />
          <div v-for="(item, index) in group.items" :key="`grgroup${index}`">
            <template v-if="(item.advanced || false) === showadvanced || showadvanced">
              <div class="divider" v-if="item.type === 'divider'" :key="`divider${index}`" />
              <div v-else-if="item.type === 'h-toggle'" :key="`htoggle${index}`" class="nux-htoggle nu-flex nu-center-vert nu-cursor-pointer" @click="toggleHeading">
                <span v-if="props.editor?.state?.selection?.$anchor?.path?.[1] === 0 && props.editor?.state?.selection?.$anchor?.path?.[2] === 0">Title</span>
                <span v-else-if="!props.editor.isActive('heading')">Normal text</span>
                <span v-else>Heading</span>
                <NuIcon class="nux-arrow-dropdown">
                  <NuIconArrowDropdown />
                </NuIcon>
              </div>
              <div v-else-if="item.type === 'color'" :key="`color${index}`" class="nu-flex nu-flex-col nu-m-r-md">
                <div class="nux-char-a nu-center-self-horz" @click="clickColorpicker">
                  A
                </div>
                <input
                  type="color"
                  @input="editor.chain().focus().setColor($event.target.value).run()"
                  :value="editor.getAttributes('textStyle').color || '#000000'"
                  ref="colorpicker"
                >
              </div>
              <div v-else-if="item.type === 'bgcolor'" :key="`bgcolor${index}`" class="nu-flex nu-flex-col nu-m-r-md">
                <div class="nux-marker nu-center-self-horz" @click="clickBgColorpicker">
                  <svg class="remix">
                    <use :xlink:href="`${remixiconUrl}#ri-mark-pen-line`" />
                  </svg>
                </div>
                <input
                  type="color"
                  @input="editor.chain().focus().toggleHighlight({ color: $event.target.value }).run()"
                  :value="editor.getAttributes('highlight').color || '#000000'"
                  ref="bgcolorpicker"
                >
              </div>
              <menu-item v-else :key="`index${index}`" v-bind="item" />
            </template>
          </div>
        </template>
      </div>
    </div>

    <NuGrow />

    <NuIcon>
      <NuIconMore @click="emit('editor-more')" />
    </NuIcon>
  </div>
</template>

<style lang="stylus" scoped>
.nux-tb-container
  flex-flow row nowrap
  max-height 41px
  & > *
    align-self start
  .nux-tb-inner-container
    display inline-block
    .nux-tb-group
      display inline-block
      & > div
        display inline-flex

.divider
  width: 2px;
  height: 1.25rem;
  background-color: rgba(#000, 0.1);
  margin-left: 0.6rem;
  margin-right: 0.3rem;

.nux-tb-group:first-child
  .divider
    display none !important

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

.nux-char-a
  line-height 1
  cursor pointer

.nux-marker, .nux-marker svg
  width 14px
  height 14px
  cursor pointer
.nux-marker
  margin-bottom 4px
  margin-top -3px

.nux-htoggle
  &:hover *
    color var(--nu-cl-focus)

.nux-arrow-dropdown
  margin 0 -6px
  color #888
</style>