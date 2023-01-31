<script setup lang="ts">
import MenuItem from './NuToolbarItem.vue'
import { ref } from 'vue'
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'
// TODO Replace all Remix icons by own (svg) icons.

import NuIconBold from '@nutzui/nutzui/components/icons/NuIconBold.vue'

const props = defineProps({
  editor: {
      type: Object,
      required: true,
    },
})

const colorpicker = ref(null)
const bgcolorpicker = ref(null)

const clickColorpicker = () => {
  colorpicker.value?.[0]?.click()
}

const clickBgColorpicker = () => {
  bgcolorpicker.value?.[0]?.click()
}

const items = [
  {
    icon: NuIconBold, // 'bold',
    title: 'Bold',
    action: () => props.editor.chain().focus().toggleBold().run(),
    isActive: () => props.editor.isActive('bold'),
  },
  {
    icon: 'italic',
    title: 'Italic',
    action: () => props.editor.chain().focus().toggleItalic().run(),
    isActive: () => props.editor.isActive('italic'),
  },
  {
    icon: 'strikethrough',
    title: 'Strike',
    action: () => props.editor.chain().focus().toggleStrike().run(),
    isActive: () => props.editor.isActive('strike'),
  },
  // {
  //   icon: 'code-view',
  //   title: 'Code',
  //   action: () => props.editor.chain().focus().toggleCode().run(),
  //   isActive: () => props.editor.isActive('code'),
  // },
  // {
  //   icon: 'mark-pen-line',
  //   title: 'Highlight',
  //   action: () => props.editor.chain().focus().toggleHighlight().run(),
  //   isActive: () => props.editor.isActive('highlight'),
  // },
  {
    type: 'divider',
  },
  {
    icon: 'h-1',
    title: 'Heading 1',
    action: () => props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 1 }),
  },
  {
    icon: 'h-2',
    title: 'Heading 2',
    action: () => props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 2 }),
  },
  {
    icon: 'h-3',
    title: 'Heading 3',
    action: () => props.editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 3 }),
  },
  {
    icon: 'h-4',
    title: 'Heading 4',
    action: () => props.editor.chain().focus().toggleHeading({ level: 4 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 4 }),
  },
  {
    icon: 'paragraph',
    title: 'Paragraph',
    action: () => props.editor.chain().focus().setParagraph().run(),
    isActive: () => props.editor.isActive('paragraph'),
  },
  {
    icon: 'list-unordered',
    title: 'Bullet List',
    action: () => props.editor.chain().focus().toggleBulletList().run(),
    isActive: () => props.editor.isActive('bulletList'),
  },
  {
    icon: 'list-ordered',
    title: 'Ordered List',
    action: () => props.editor.chain().focus().toggleOrderedList().run(),
    isActive: () => props.editor.isActive('orderedList'),
  },
  {
    // icon: 'list-check-2',
    icon: 'checkbox-line',
    title: 'Task List',
    action: () => props.editor.chain().focus().toggleTaskList().run(),
    isActive: () => props.editor.isActive('taskList'),
  },
  // {
  //   icon: 'code-box-line',
  //   title: 'Code Block',
  //   action: () => props.editor.chain().focus().toggleCodeBlock().run(),
  //   isActive: () => props.editor.isActive('codeBlock'),
  // },
  {
    type: 'divider',
  },
  {
    icon: 'double-quotes-l',
    title: 'Blockquote',
    action: () => props.editor.chain().focus().toggleBlockquote().run(),
    isActive: () => props.editor.isActive('blockquote'),
  },
  {
    icon: 'separator',
    title: 'Horizontal Rule',
    action: () => props.editor.chain().focus().setHorizontalRule().run(),
  },
  {
    type: 'divider',
  },
  // {
  //   icon: 'text-wrap',
  //   title: 'Hard Break',
  //   action: () => props.editor.chain().focus().setHardBreak().run(),
  // },
  {
    icon: 'format-clear',
    title: 'Clear Format',
    action: () => props.editor.chain()
      .focus()
      .clearNodes()
      .unsetAllMarks()
      .run(),
  },
  // {
  //   type: 'divider',
  // },
  // {
  //   icon: 'arrow-go-back-line',
  //   title: 'Undo',
  //   action: () => props.editor.chain().focus().undo().run(),
  // },
  // {
  //   icon: 'arrow-go-forward-line',
  //   title: 'Redo',
  //   action: () => props.editor.chain().focus().redo().run(),
  // },
  {
    type: 'divider',
  },
  {
    icon: 'align-left',
    title: 'Align left',
    action: () => props.editor.chain().focus().setTextAlign('left').run(),
    isActive: () => props.editor.isActive({ textAlign: 'left' }),
  },
  {
    icon: 'align-center',
    title: 'Align center',
    action: () => props.editor.chain().focus().setTextAlign('center').run(),
    isActive: () => props.editor.isActive({ textAlign: 'center' }),
  },
  {
    icon: 'align-right',
    title: 'Align right',
    action: () => props.editor.chain().focus().setTextAlign('right').run(),
    isActive: () => props.editor.isActive({ textAlign: 'right' }),
  },
  {
    icon: 'align-justify',
    title: 'Align justify',
    action: () => props.editor.chain().focus().setTextAlign('justify').run(),
    isActive: () => props.editor.isActive({ textAlign: 'justify' }),
  },
  {
    type: 'divider',
  },
  {
    type: 'color',
  },
  {
    type: 'bgcolor',
  },
]
</script>

<template>
  <div>
    <template v-for="(item, index) in items">
      <div class="divider" v-if="item.type === 'divider'" :key="`divider${index}`" />
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
      <menu-item v-else :key="index" v-bind="item" />
    </template>
  </div>
</template>

<style lang="stylus" scoped>
.divider {
  width: 2px;
  height: 1.25rem;
  background-color: rgba(#000, 0.1);
  margin-left: 0.5rem;
  margin-right: 0.75rem;
}

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
</style>