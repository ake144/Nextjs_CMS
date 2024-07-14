import React from "react";

interface TiptapProps {
  content: string;
  onChange: (value: string) => void;
}

const Tiptap: React.FC<TiptapProps> = ({ content, onChange }) => {
  return (
    <textarea
      value={content}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-40 p-4 border text-black dark:text-white dark:bg-white bg-gray-400  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    />
  );
};

export default Tiptap;
