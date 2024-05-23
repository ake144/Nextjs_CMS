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
    Palette
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
        <div className='flex bg-transparent border border-input gap-2'>
            <Bold onClick={() => editor.chain().focus().toggleBold().run()} />
            <Italic onClick={() => editor.chain().focus().toggleItalic().run()} />
            <Strikethrough onClick={() => editor.chain().focus().toggleStrike().run()} />
            <List onClick={() => editor.chain().focus().toggleBulletList().run()} />
            <ListOrdered onClick={() => editor.chain().focus().toggleOrderedList().run()} />
            {/* <Palette onClick={()=>editor.chain().focus().togglePalette().run()} /> */}
            <Heading2 onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} />
            <Toggle />
        </div>
    )
}