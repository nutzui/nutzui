import NuIconBold from '@nutzui/nutzui/components/icons/NuIconBold.vue'
import NuIconItalic from '@nutzui/nutzui/components/icons/NuIconItalic.vue'
import NuIconStrikethrough from '@nutzui/nutzui/components/icons/NuIconStrikethrough.vue'
import NuIconH1 from '@nutzui/nutzui/components/icons/NuIconH1.vue'
import NuIconListBullet from '@nutzui/nutzui/components/icons/NuIconListBullet.vue'
import NuIconListNumbered from '@nutzui/nutzui/components/icons/NuIconListNumbered.vue'
import NuIconListCheck from '@nutzui/nutzui/components/icons/NuIconListCheck.vue'
import NuIconMarker from '@nutzui/nutzui/components/icons/NuIconMarker.vue'
import NuIconA from '@nutzui/nutzui/components/icons/NuIconA.vue'

/*
--------------------------------------------------------------------------
--------------------------------------------------------------------------
*/

export const getEditorToolbarDef = (editor: any) => {
  return [
    {
      items: [
        {
          icon: NuIconListBullet,
          title: 'Bullet List',
          action: () => editor.chain().focus().toggleBulletList().run(),
          isActive: () => editor.isActive('bulletList'),
        },
        {
          icon: NuIconListNumbered,
          title: 'Ordered List',
          action: () => editor.chain().focus().toggleOrderedList().run(),
          isActive: () => editor.isActive('orderedList'),
          advanced: true,
        },
        {
          icon: NuIconListCheck,
          title: 'Checklist',
          action: () => editor.chain().focus().toggleTaskList().run(),
          isActive: () => editor.isActive('taskList'),
        },
      ]
    },
    {
      items: [
        // {
        //   type: 'divider',
        // },
        {
          icon: NuIconBold,
          title: 'Bold',
          action: () => editor.chain().focus().toggleBold().run(),
          isActive: () => editor.isActive('bold'),
        },
        {
          icon: NuIconItalic,
          title: 'Italic',
          action: () => editor.chain().focus().toggleItalic().run(),
          isActive: () => editor.isActive('italic'),
        },
        {
          icon: NuIconStrikethrough,
          title: 'Strike',
          action: () => editor.chain().focus().toggleStrike().run(),
          isActive: () => editor.isActive('strike'),
          advanced: true,
        },
        // {
        //   icon: 'code-view',
        //   title: 'Code',
        //   action: () => editor.chain().focus().toggleCode().run(),
        //   isActive: () => editor.isActive('code'),
        // },
        {
          icon: NuIconMarker,
          title: 'Highlight',
          action: () => editor.chain().focus().toggleHighlight({ color: '#faf594' }).run(),
          isActive: () => editor.isActive('highlight'),
          advanced: false,
        },
        // {
        //   type: 'color',
        //   advanced: true,
        // },
        {
          type: 'color',
          icon: NuIconA,
          title: 'Text color',
          action: (v: any) => editor.chain().focus().setColor(v).run(),
          isActive: () => editor.isActive('textStyle'),
          advanced: true,
        },
        {
          type: 'bgcolor',
          icon: NuIconMarker,
          title: 'Highlight color',
          action: (v: any) => editor.chain().focus().toggleHighlight({ color: v }).run(),
          isActive: () => editor.isActive('highlight'),
          advanced: true,
        },
      ]
    },
    {
      advanced: true,
      items: [
        // {
        //   type: 'divider',
        //   advanced: true,
        // },
        // {
        //   type: 'h-toggle',
        //   advanced: true,
        // },
        {
          type: 'divider',
          advanced: true,
        },
        // {
        //   icon: NuIconH1,
        //   title: 'Heading 1',
        //   action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        //   isActive: () => editor.isActive('heading', { level: 1 }),
        // },
        // {
        //   icon: 'h-2',
        //   title: 'Heading 2',
        //   action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        //   isActive: () => editor.isActive('heading', { level: 2 }),
        // },
        // {
        //   icon: 'h-3',
        //   title: 'Heading 3',
        //   action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        //   isActive: () => editor.isActive('heading', { level: 3 }),
        // },
        // {
        //   icon: 'h-4',
        //   title: 'Heading 4',
        //   action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
        //   isActive: () => editor.isActive('heading', { level: 4 }),
        // },
        // {
        //   icon: 'paragraph',
        //   title: 'Paragraph',
        //   action: () => editor.chain().focus().setParagraph().run(),
        //   isActive: () => editor.isActive('paragraph'),
        // },
        // {
        //   icon: 'code-box-line',
        //   title: 'Code Block',
        //   action: () => editor.chain().focus().toggleCodeBlock().run(),
        //   isActive: () => editor.isActive('codeBlock'),
        // },
        {
          type: 'divider',
          advanced: true,
        },
        {
          icon: 'double-quotes-l',
          title: 'Blockquote',
          action: () => editor.chain().focus().toggleBlockquote().run(),
          isActive: () => editor.isActive('blockquote'),
          advanced: true,
        },
        {
          icon: 'separator',
          title: 'Horizontal Rule',
          action: () => editor.chain().focus().setHorizontalRule().run(),
          advanced: true,
        },
        {
          type: 'divider',
          advanced: true,
        },
        // {
        //   icon: 'text-wrap',
        //   title: 'Hard Break',
        //   action: () => editor.chain().focus().setHardBreak().run(),
        // },
        {
          icon: 'format-clear',
          title: 'Clear Format',
          action: () => editor.chain()
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
        //   action: () => editor.chain().focus().undo().run(),
        // },
        // {
        //   icon: 'arrow-go-forward-line',
        //   title: 'Redo',
        //   action: () => editor.chain().focus().redo().run(),
        // },
        {
          type: 'divider',
          advanced: true,
        },
        {
          icon: 'align-left',
          title: 'Align left',
          action: () => editor.chain().focus().setTextAlign('left').run(),
          isActive: () => editor.isActive({ textAlign: 'left' }),
          advanced: true,
        },
        {
          icon: 'align-center',
          title: 'Align center',
          action: () => editor.chain().focus().setTextAlign('center').run(),
          isActive: () => editor.isActive({ textAlign: 'center' }),
          advanced: true,
        },
        {
          icon: 'align-right',
          title: 'Align right',
          action: () => editor.chain().focus().setTextAlign('right').run(),
          isActive: () => editor.isActive({ textAlign: 'right' }),
          advanced: true,
        },
        {
          icon: 'align-justify',
          title: 'Align justify',
          action: () => editor.chain().focus().setTextAlign('justify').run(),
          isActive: () => editor.isActive({ textAlign: 'justify' }),
          advanced: true,
        },
        // {
        //   type: 'divider',
        //   advanced: true,
        // },
      ]
    }
  ]
}
