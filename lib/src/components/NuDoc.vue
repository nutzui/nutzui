<script setup lang="ts">
import './nutzui.styl'
import { onMounted, ref, watch } from 'vue'
// import * as qqq from '@slate-yjs/core'
import {EditorState} from 'prosemirror-state'
import {EditorView} from 'prosemirror-view'
import { newYDoc, getYXmlFragment, ySyncPlugin } from '@coyoda/core/item-y'

import {Schema, DOMParser} from "prosemirror-model"
// import {schema} from "prosemirror-schema-basic"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"

import { schema } from './prosemirrorSchema.js'

// TODO ProseMirror expects the CSS white-space property to be set, preferably to ‘pre-wrap’. It is recommended to load style/prosemirror.css from the prosemirror-view package.
import 'prosemirror-menu/style/menu.css' // See: https://discuss.prosemirror.net/t/missing-stylesheets-documentation/1500/6


import { useEditor, Editor, EditorContent } from '@tiptap/vue-3'
// import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'

import MenuBar from './NuToolbar.vue'


const props = defineProps({
  xmlfragment: Object,
})

const docdiv = ref(null)
const editordiv = ref(null)

let editor2: any

onMounted(() => {
  console.log('docdiv.value', docdiv.value, editordiv.value, props.xmlfragment)

  // // const ydocument = new Y.Doc()
  // const ydocument = newYDoc()

  // // const type = ydocument.get('prosemirror', Y.XmlFragment)
  // // const type = ydocument.get('prosemirror', getYXmlFragment())
  // const type = ydocument.getXmlFragment('prosemirror')


  // // const prosemirrorView = new EditorView(document.querySelector('#editor'), {
  // const prosemirrorView = new EditorView(docdiv.value, {
  //   state: EditorState.create({
  //     // schema,
  //     plugins: [
  //       // ySyncPlugin(type),
  //       // yCursorPlugin(provider.awareness),
  //       yUndoPlugin(),
  //       // keymap({
  //       //   'Mod-z': undo,
  //       //   'Mod-y': redo,
  //       //   'Mod-Shift-z': redo
  //       // })
  //     ].concat(exampleSetup({ schema }))
  //   })
  // })

  // console.log('prosemirrorView', prosemirrorView)


  // // Mix the nodes from prosemirror-schema-list into the basic schema to
  // // create a schema with list support.
  // const mySchema = new Schema({
  //   nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  //   marks: schema.spec.marks
  // })

  // // const test = new EditorView(document.querySelector("#editor"), {
  // const test = new EditorView(docdiv.value, {
  //   state: EditorState.create({
  //     // doc: DOMParser.fromSchema(mySchema).parse(document.querySelector("#content")),
  //     // doc: DOMParser.fromSchema(mySchema).parse(docdiv.value),
  //     // plugins: [
  //     //   ...exampleSetup({schema: mySchema}),
  //     //   ySyncPlugin(type),
  //     // ]
  //     plugins: [
  //       ySyncPlugin(type),
  //     ].concat(exampleSetup({schema: mySchema}))
  //   })
  // })

  // console.log('test', test)


  // // const editor = document.createElement('div')
  // // editor.setAttribute('id', 'editor')
  // const editor = editordiv.value
  // // const editorContainer = document.createElement('div')
  // // const editorContainer = docdiv.value
  // // editorContainer.insertBefore(editor, null)

  // const prosemirrorView = new EditorView(editor, {
  //   state: EditorState.create({
  //     schema,
  //     plugins: [
  //       ySyncPlugin(props.xmlfragment),
  //       // yCursorPlugin(provider.awareness),
  //       // yUndoPlugin(),
  //       // keymap({
  //       //   'Mod-z': undo,
  //       //   'Mod-y': redo,
  //       //   'Mod-Shift-z': redo
  //       // })
  //     ].concat(exampleSetup({ schema }))
  //   })
  // })
  // // document.body.insertBefore(editorContainer, null)

  // console.log('prosemirrorView', prosemirrorView)
})

// const editor = useEditor({
//   content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
//   extensions: [
//     StarterKit,
//   ],
// })

// const editor = new Editor({
//   extensions: [
//     StarterKit.configure({
//       // The Collaboration extension comes with its own history handling
//       history: false,
//     }),
//     // Register the document with Tiptap
//     Collaboration.configure({
//       // // document: props.xmlfragment,
//       // document: props.xmlfragment,
//       // field: 'doc'
//       fragment: props.xmlfragment
//     }),
//   ],
// })

  // editor2 = useEditor({
  //   extensions: [
  //     // StarterKit.configure({
  //     //   // The Collaboration extension comes with its own history handling
  //     //   history: false,
  //     // }),
  //     // Register the document with Tiptap
  //     // Collaboration.configure({
  //     //   // // document: props.xmlfragment,
  //     //   // document: props.xmlfragment,
  //     //   // field: 'doc'
  //     //   fragment: props.xmlfragment
  //     // }),
  //     Document,
  //     Paragraph,
  //     Text,
  //   ],
  // })

  editor2 = new Editor({
    extensions: [
      StarterKit.configure({
        // The Collaboration extension comes with its own history handling
        history: false,
      }),
      // Register the document with Tiptap
      // Collaboration.configure({
      //   // // document: props.xmlfragment,
      //   // document: props.xmlfragment,
      //   // field: 'doc'
      //   fragment: props.xmlfragment
      // }),
      Document,
      Paragraph,
      Text,
      Highlight,
      TaskList,
      TaskItem,
    ],
    autofocus: true,
    editable: true,
    injectCSS: false,
  })

  // console.log('aaa', editor2)
  // console.log('ccc', editor2.value)

  // watch(() => editor2.value, async (newValue) => {
  //   console.log('bbb', newValue)
  //   // editor2.value.commands.registerPlugin(ySyncPlugin(props.xmlfragment))
  //   // TODO Do this via own custom TipTap extension: https://tiptap.dev/guide/custom-extensions
  //   editor2.value.registerPlugin(ySyncPlugin(props.xmlfragment))
  // })


  // editor2.value.commands.registerPlugin(ySyncPlugin(props.xmlfragment))
  editor2.registerPlugin(ySyncPlugin(props.xmlfragment))


  // TODO
  // beforeUnmount() {
  //   this.editor.destroy()
  //   this.provider.destroy()
  // }
</script>

<template>
  <!-- ==={{ content }} -->
  <!-- <br><br> -->

  <!-- ###
  <div class="nuxdoc" ref="docdiv">
    <div ref="editordiv">
    </div>
  </div> -->

  ###
  <div class="editor" v-if="editor2">
    <menu-bar class="editor__header" :editor="editor2" />
    <editor-content class="editor__content" :editor="editor2" />
  </div>
</template>

<style lang="stylus" scoped>
.nuxdoc
  width 100%
  white-space pre-wrap
</style>



<style lang="stylus">
.editor {
  display: flex;
  flex-direction: column;
  max-height: 26rem;
  color: #0D0D0D;
  background-color: #FFF;
  border: 3px solid #0D0D0D;
  border-radius: 0.35rem;
  &__header {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
    border-bottom: 3px solid #0D0D0D;
  }
  &__content {
    padding: 1.25rem 1rem;
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>

<style lang="stylus">
/* Basic editor styles */
.ProseMirror {
  outline: none;

  > * + * {
    // margin-top: 0.75em;
  }
  p {
    margin: 0;
    line-height: 1.2;
  }
  ul,
  ol {
    padding: 0 1rem;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }
  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }
  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }
  mark {
    background-color: #FAF594;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  hr {
    margin: 1rem 0;
  }
  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }
  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;
    li {
      display: flex;
      align-items: center;
      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }
      > div {
        flex: 1 1 auto;
      }
    }
  }
}
</style>