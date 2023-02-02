<script setup lang="ts">
import MenuItem from './NuToolbarItem.vue'
import { ref } from 'vue'
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'
// TODO Replace all Remix icons by own (svg) icons.

import NuIconBold from '@nutzui/nutzui/components/icons/NuIconBold.vue'
import NuIconItalic from '@nutzui/nutzui/components/icons/NuIconItalic.vue'
import NuIconStrikethrough from '@nutzui/nutzui/components/icons/NuIconStrikethrough.vue'
import NuIconH1 from '@nutzui/nutzui/components/icons/NuIconH1.vue'
import NuIconArrowDropdown from '@nutzui/nutzui/components/icons/NuIconArrowDropdown.vue'
import NuIconListBullet from '@nutzui/nutzui/components/icons/NuIconListBullet.vue'
import NuIconListCheck from '@nutzui/nutzui/components/icons/NuIconListCheck.vue'
import NuIconMarker from '@nutzui/nutzui/components/icons/NuIconMarker.vue'
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

const items = [
{
    icon: NuIconListBullet,
    title: 'Bullet List',
    action: () => props.editor.chain().focus().toggleBulletList().run(),
    isActive: () => props.editor.isActive('bulletList'),
  },
  {
    icon: 'list-ordered',
    title: 'Ordered List',
    action: () => props.editor.chain().focus().toggleOrderedList().run(),
    isActive: () => props.editor.isActive('orderedList'),
    advanced: true,
  },
  {
    icon: NuIconListCheck,
    title: 'Checklist',
    action: () => props.editor.chain().focus().toggleTaskList().run(),
    isActive: () => props.editor.isActive('taskList'),
  },
  {
    type: 'divider',
  },
  {
    icon: NuIconBold,
    title: 'Bold',
    action: () => props.editor.chain().focus().toggleBold().run(),
    isActive: () => props.editor.isActive('bold'),
  },
  {
    icon: NuIconItalic,
    title: 'Italic',
    action: () => props.editor.chain().focus().toggleItalic().run(),
    isActive: () => props.editor.isActive('italic'),
  },
  {
    icon: NuIconStrikethrough,
    title: 'Strike',
    action: () => props.editor.chain().focus().toggleStrike().run(),
    isActive: () => props.editor.isActive('strike'),
    advanced: true,
  },
  // {
  //   icon: 'code-view',
  //   title: 'Code',
  //   action: () => props.editor.chain().focus().toggleCode().run(),
  //   isActive: () => props.editor.isActive('code'),
  // },
  {
    icon: NuIconMarker,
    title: 'Highlight',
    action: () => props.editor.chain().focus().toggleHighlight().run(),
    isActive: () => props.editor.isActive('highlight'),
    advanced: false,
  },
  {
    type: 'divider',
    advanced: true,
  },
  {
    type: 'h-toggle',
    advanced: true,
  },
  {
    type: 'divider',
    advanced: true,
  },
  // {
  //   icon: NuIconH1,
  //   title: 'Heading 1',
  //   action: () => props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
  //   isActive: () => props.editor.isActive('heading', { level: 1 }),
  // },
  // {
  //   icon: 'h-2',
  //   title: 'Heading 2',
  //   action: () => props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
  //   isActive: () => props.editor.isActive('heading', { level: 2 }),
  // },
  // {
  //   icon: 'h-3',
  //   title: 'Heading 3',
  //   action: () => props.editor.chain().focus().toggleHeading({ level: 3 }).run(),
  //   isActive: () => props.editor.isActive('heading', { level: 3 }),
  // },
  // {
  //   icon: 'h-4',
  //   title: 'Heading 4',
  //   action: () => props.editor.chain().focus().toggleHeading({ level: 4 }).run(),
  //   isActive: () => props.editor.isActive('heading', { level: 4 }),
  // },
  // {
  //   icon: 'paragraph',
  //   title: 'Paragraph',
  //   action: () => props.editor.chain().focus().setParagraph().run(),
  //   isActive: () => props.editor.isActive('paragraph'),
  // },
  // {
  //   icon: 'code-box-line',
  //   title: 'Code Block',
  //   action: () => props.editor.chain().focus().toggleCodeBlock().run(),
  //   isActive: () => props.editor.isActive('codeBlock'),
  // },
  {
    type: 'divider',
    advanced: true,
  },
  {
    icon: 'double-quotes-l',
    title: 'Blockquote',
    action: () => props.editor.chain().focus().toggleBlockquote().run(),
    isActive: () => props.editor.isActive('blockquote'),
    advanced: true,
  },
  {
    icon: 'separator',
    title: 'Horizontal Rule',
    action: () => props.editor.chain().focus().setHorizontalRule().run(),
    advanced: true,
  },
  {
    type: 'divider',
    advanced: true,
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
    advanced: true,
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
    advanced: true,
  },
  {
    icon: 'align-left',
    title: 'Align left',
    action: () => props.editor.chain().focus().setTextAlign('left').run(),
    isActive: () => props.editor.isActive({ textAlign: 'left' }),
    advanced: true,
  },
  {
    icon: 'align-center',
    title: 'Align center',
    action: () => props.editor.chain().focus().setTextAlign('center').run(),
    isActive: () => props.editor.isActive({ textAlign: 'center' }),
    advanced: true,
  },
  {
    icon: 'align-right',
    title: 'Align right',
    action: () => props.editor.chain().focus().setTextAlign('right').run(),
    isActive: () => props.editor.isActive({ textAlign: 'right' }),
    advanced: true,
  },
  {
    icon: 'align-justify',
    title: 'Align justify',
    action: () => props.editor.chain().focus().setTextAlign('justify').run(),
    isActive: () => props.editor.isActive({ textAlign: 'justify' }),
    advanced: true,
  },
  {
    type: 'divider',
    advanced: true,
  },
  {
    type: 'color',
    advanced: true,
  },
  {
    type: 'bgcolor',
    advanced: true,
  },
]
</script>

<template>
  <div class="nu-flex">
    <template v-for="(item, index) in items">
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
        <menu-item v-else :key="index" v-bind="item" />
      </template>
    </template>

    <NuGrow />

    <NuIcon>
      <NuIconMore @click="emit('editor-more')" />
    </NuIcon>
  </div>
</template>

<style lang="stylus" scoped>
.divider {
  width: 2px;
  height: 1.25rem;
  background-color: rgba(#000, 0.1);
  margin-left: 0.6rem;
  margin-right: 0.3rem;
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

.nux-htoggle
  &:hover *
    color var(--nu-cl-focus)

.nux-arrow-dropdown
  margin 0 -6px
  color #888
</style>