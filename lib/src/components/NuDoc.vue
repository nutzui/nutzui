<script setup lang="ts">
import './nutzui.styl'
import { onMounted, ref } from 'vue'
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

const props = defineProps({
  xmlfragment: Object,
})

const docdiv = ref(null)
const editordiv = ref(null)

onMounted(() => {
  console.log('docdiv.value', docdiv.value, editordiv.value)

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


  // const editor = document.createElement('div')
  // editor.setAttribute('id', 'editor')
  const editor = editordiv.value
  // const editorContainer = document.createElement('div')
  // const editorContainer = docdiv.value
  // editorContainer.insertBefore(editor, null)

  const prosemirrorView = new EditorView(editor, {
    state: EditorState.create({
      schema,
      plugins: [
        ySyncPlugin(props.xmlfragment),
        // yCursorPlugin(provider.awareness),
        // yUndoPlugin(),
        // keymap({
        //   'Mod-z': undo,
        //   'Mod-y': redo,
        //   'Mod-Shift-z': redo
        // })
      ].concat(exampleSetup({ schema }))
    })
  })
  // document.body.insertBefore(editorContainer, null)

  console.log('prosemirrorView', prosemirrorView)
})
</script>

<template>
  <!-- ==={{ content }} -->
  <!-- <br><br> -->
  ###
  <div class="nuxdoc" ref="docdiv">
    <div ref="editordiv">
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.nuxdoc
  width 100%
  white-space pre-wrap
</style>
