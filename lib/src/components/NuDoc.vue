<script setup lang="ts">
import './nutzui.styl'
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { ySyncPlugin } from '@coyoda/core/item-y'
import { t } from 'i18next'

import { useEditor, Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'

import Heading from '@tiptap/extension-heading'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'

import MenuBar from './NuToolbar.vue'

/*
--------------------------------------------------------------------------
--------------------------------------------------------------------------
*/

const DocumentWithHeading = Document.extend({
  content: 'heading block*',
})

const props = defineProps({
  xmlfragment: Object,
  showadvanced: Boolean,
})

const emit = defineEmits(['editor-more', 'editor-paragraph-style'])

let editor2: any = ref(null)

onMounted(() => {
  editor2.value = new Editor({
    extensions: [
      DocumentWithHeading,

      StarterKit.configure({
        document: false,
        // The Collaboration extension comes with its own history handling
        // TODO Create own undo/redo based on the users own changes (not the changes of others.)
        history: false,
      }),

      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return t('What’s the title?') // TODO Should be computed.
          }

          return 'Anything else to add?' // 'Write something...' // TODO Do we want this? What text? Should be computed.
        },
      }),

      // Register the document with Tiptap
      // Collaboration.configure({
      //   // // document: props.xmlfragment,
      //   // document: props.xmlfragment,
      //   // field: 'doc'
      //   fragment: props.xmlfragment
      // }),

      // Document,
      // Paragraph,
      // Text,
      // Heading,

      TaskList,
      TaskItem,

      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Color,
      TextStyle,
      Highlight.configure({
        multicolor: true,
      })
    ],
    autofocus: true,
    editable: true,
    injectCSS: false,
  })

  editor2.value.registerPlugin(ySyncPlugin(props.xmlfragment)) // TODO Better do this via an own custom TipTap extension. See: https://tiptap.dev/guide/custom-extensions#prosemirror-plugins
})

onUnmounted(() => {
  editor2.value.destroy()
})
</script>

<template>
  <!-- ==={{ content }} -->
  <!-- <br><br> -->

  <div class="editor" v-if="editor2">
    <MenuBar
      class="editor__header"
      :editor="editor2"
      @editor-more="emit('editor-more', editor2)"
      @editor-paragraph-style="emit('editor-paragraph-style', editor2)"
      :showadvanced="showadvanced"
    />
    <editor-content class="editor__content" :editor="editor2" />
  </div>
</template>

<style lang="stylus" scoped>
.nuxdoc
  width 100%
  white-space pre-wrap
</style>



<style lang="stylus" scoped>
.editor
  display: flex;
  flex-direction: column;
  max-height: 26rem;
  color: #0D0D0D;
  background-color: #FFF;
  // border: 3px solid #0D0D0D;
  // border-radius: 0.35rem;
  border 1px solid var(--nu-cl-border-input)
  border-radius 2px
  &:focus-within
    box-shadow none
    outline none
    border-color var(--nu-cl-focus)
    & .editor__header
      border-color var(--nu-cl-focus) !important
  &__header
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    // flex-wrap: wrap;
    padding: 0.25rem;
    // border-bottom: 3px solid #0D0D0D;
    border-bottom 1px solid var(--nu-cl-border-input)
  &__content
    padding: 1.25rem 1rem;
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
</style>

<style lang="stylus">
/* Basic editor styles */
.ProseMirror
  outline none
  white-space pre-wrap

  // > * + *
    // margin-top: 0.75em;
  p
    margin 0
    line-height 1.4
  ul, ol
    padding: 0 1rem;

  h1, h2, h3, h4, h5, h6
    line-height 1.2
    margin-top 12px
    margin-bottom 6px
    &:first-child
      margin-top 0
  
  code
    background-color: rgba(#616161, 0.1);
    color: #616161;
  pre
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    code
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
  mark
    background-color: #FAF594;
  img
    max-width: 100%;
    height: auto;
  hr
    margin: 1rem 0;
  blockquote
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  hr
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;

  ul[data-type="taskList"]
    list-style: none;
    padding: 0;
    li
      display: flex;
      align-items: center;
      p
        margin 0
        padding 0
        line-height 1
      input
        height auto !important
        padding 0 !important
        margin 0 !important
      > label
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
        transform: translate(0, 1px) !important;
        accent-color var(--nu-cl-focus) !important
      > div
        flex: 1 1 auto;

/* Placeholder (at the top) */
// .ProseMirror p.is-editor-empty:first-child::before
// .ProseMirror .is-empty:first-child::before
/* Placeholder (on every new line) */
.ProseMirror .is-empty::before
  content: attr(data-placeholder);
  float: left;
  color: #ced4da;
  pointer-events: none;
  height: 0;
</style>