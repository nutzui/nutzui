<script setup lang="ts">
import { getEditorToolbarDef } from './NuEditorToolbarSettings'
import MenuItem from './NuToolbarItem.vue'
import { ref } from 'vue'
import { getEditorParagraphType } from '../helpers/paragraph'
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'
// TODO Replace all Remix icons by own (svg) icons.

import NuIconArrowDropdown from '@nutzui/nutzui/components/icons/NuIconArrowDropdown.vue'
import NuIconMore from '@nutzui/nutzui/components/icons/NuIconMore.vue'
import NuCustomIconColor from '@nutzui/nutzui/components/NuCustomIconColor.vue'
import NuCustomIconParagraph from '@nutzui/nutzui/components/NuCustomIconParagraph.vue'

const props = defineProps({
  editor: {
    type: Object,
    required: true,
  },
  showadvanced: Boolean,
})

const emit = defineEmits(['editor-more', 'editor-paragraph-style'])

const getPara = () => {
  return getEditorParagraphType(props.editor)
}

const items = getEditorToolbarDef(props.editor)
</script>

<template>
  <div class="nux-tb-container nu-flex nu-overflow-hidden">
    <div class="nux-tb-inner-container nu-flex nu-overflow-hidden">
      <div v-for="(group, grindex) in items" :key="`gr_${grindex}`" class="nux-tb-group">
        <template v-if="(showadvanced === false && group.advanced !== true) || (showadvanced === true && group.advanced !== false)">
          <div class="divider" :key="`grdivider${grindex}`" />
          <div v-for="(item, index) in group.items" :key="`grgroup${index}`">
            <template v-if="(showadvanced === false && item.advanced !== true) || (showadvanced === true && item.advanced !== false)">
              <div class="divider" v-if="item.type === 'divider'" :key="`divider${index}`" />
              <menu-item
                v-else
                :key="`index${index}`"
                :icon="item.icon"
                :title="item.title"
                :action="item.action"
                :isActive="item.isActive"
              >
                <template #icon v-if="item.type === 'paragraph'">
                  <NuCustomIconParagraph
                    :icon="item.icon"
                    :value="getPara()"
                    @click="emit('editor-paragraph-style')"
                  />
                </template>
                <template #icon v-if="item.type === 'color'">
                  <NuCustomIconColor
                    :icon="item.icon"
                    :color="editor.getAttributes('textStyle').color || '#999999'"
                    :action="item.action"
                    :isActive="item.isActive"
                  />
                </template>
                <template #icon v-else-if="item.type === 'bgcolor'">
                  <NuCustomIconColor
                    :icon="item.icon"
                    :color="editor.isActive('highlight') ? editor.getAttributes('highlight').color || '#faf594' : '#999999'"
                    :action="item.action"
                    :isActive="item.isActive"
                  />
                </template>
              </menu-item>
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
    align-self center
  .nux-tb-inner-container
    // display inline-block
    display inline-flex
    .nux-tb-group
      // display inline-block
      display inline-flex
      align-items center
      & > div
        display inline-flex

:deep(NuIcon)
  color #999

.divider
  width: 2px;
  height: 1.25rem;
  background-color: rgba(#000, 0.1);
  margin-left: 0.6rem;
  margin-right: 0.3rem;

.nux-tb-group:first-child
  .divider
    display none !important

// input[type="color"]
//   -webkit-appearance: none;
//   border: none;
//   width: 16px;
//   height: 4px;
//   padding 0
//   cursor pointer
// input[type="color"]::-webkit-color-swatch-wrapper
//   padding: 0;
// input[type="color"]::-webkit-color-swatch
//   border: none;

.nux-char-a
  line-height 1
  cursor pointer

// .nux-marker, .nux-marker svg
//   width 14px
//   height 14px
//   cursor pointer
// .nux-marker
//   margin-bottom 4px
//   margin-top -3px

.nux-htoggle
  &:hover *
    color var(--nu-cl-focus)

.nux-arrow-dropdown
  margin 0 -6px
  color #888
</style>
