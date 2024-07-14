'use client'

import { type Editor} from '@tiptap/react'
import {
    Bold,
    Italic,
    Strikethrough,
    Underline,
    File,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    MessageCircleCode ,

    Palette,
    Undo,
    Redo,
    SquareCode
} from 'lucide-react'
import {Toggle} from '@/components/ui/toggle'

type Props = {
    editor: Editor | null
}

export const Toolbar = ({editor}: Props) => {
    if (!editor) {
        return null
    }

    return (
        <div className='flex dark:text-black text-white  items-center justify-center bg-transparent border border-input gap-2'>
            <Bold  onClick={() => editor.chain().focus().toggleBold().run()} />
            <Italic onClick={() => editor.chain().focus().toggleItalic().run()} />
            <Strikethrough onClick={() => editor.chain().focus().toggleStrike().run()} />
            <List onClick={() => editor.chain().focus().toggleBulletList().run()} />
            <ListOrdered onClick={() => editor.chain().focus().toggleOrderedList().run()} />
            <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={editor.isActive('code') ? 'is-active' : ''}
        >
            <SquareCode />
         
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          <p  className='text-2xl   '>p</p>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          H1
        </button>
        <Heading2 onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} />

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
        >
          H4
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          Code block
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          <Undo />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          <Redo />
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          Horizontal rule
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard break
        </button>
                <Toggle />
        </div>
    )
}