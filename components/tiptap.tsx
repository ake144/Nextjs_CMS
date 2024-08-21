import React from "react";

interface TiptapProps {
  content: string;
  onChange: (value: string) => void;
}

const Tiptap: React.FC<TiptapProps> = ({ content, onChange }) => {
  return (
    <div className="relative">
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your post description here..."
        className="w-full h-40 p-4 border text-black dark:text-white dark:bg-gray-800 bg-gray-300 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
      <div className="absolute bottom-2 right-2 text-xs text-gray-500">{`${content.length} characters`}</div>
    </div>
  );
};

export default Tiptap;