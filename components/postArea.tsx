'use client'



import { useState } from 'react';
import { contentTemplates } from '@/components/Templste'; // Adjust the path as necessary
import { ContentTemplate } from '@/utils/types/type';

interface TemplateSelectorProps {
  onSelect: (template: ContentTemplate) => void;
  mode: 'light' | 'dark'; // Add mode prop
}

const Templates = ( ) => {


  return (
    <div className={`template-selector dark:text-white   text-black `}>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {contentTemplates.map((template) => (
          <div
            key={template.name}>
            <template.icon size={24} className='dark:text-gray-400 text-black' />
            <h3>{template.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
