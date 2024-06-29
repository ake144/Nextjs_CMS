import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import React, { useEffect, useCallback } from 'react';
import { Toolbar } from './ToolBar';

interface TiptapProps {
  content: string;
  onChange: (value: string) => void;
}


export default function TextEditor({ content, onChange }: TiptapProps) {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose min-h-[100px] p-3 m-2 max-w-none',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  const insertImage = useCallback((src: string) => {
    if (editor) {
      editor.chain().focus().setImage({ src }).run();
    }
  }, [editor]);

  useEffect(() => {
    if (editor) {
      editor.setOptions({
        onUpdate: ({ editor }) => {
          onChange(editor.getHTML());
        },
      });
    }
  }, [editor, onChange]);

  return (
    <div className="flex flex-col justify-stretch">
      <Toolbar editor={editor} />

      <EditorContent editor={editor} />
      {/* <textarea
      value={content}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-40 p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    /> */}
    </div>
  );
}
