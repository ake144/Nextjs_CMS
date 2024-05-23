import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import React, { useEffect, useCallback } from 'react';
import { Toolbar } from './ToolBar';

interface TextEditorProps {
  Description: string;
  onChange: (richText: string) => void;
}

export default function TextEditor({ Description, onChange }: TextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: Description,
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
    </div>
  );
}
