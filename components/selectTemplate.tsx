// components/TemplateSelector.tsx

import { useState } from 'react';
import { contentTemplates } from '@/components/Templste'; // Adjust the path as necessary
import { ContentTemplate } from '@/utils/types/type';

interface TemplateSelectorProps {
  onSelect: (template: ContentTemplate) => void;
  mode: 'light' | 'dark'; // Add mode prop
}

const TemplateSelector = ({ onSelect, mode }: TemplateSelectorProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<ContentTemplate | null>(null);

  const handleSelect = (template: ContentTemplate) => {
    setSelectedTemplate(template);
    onSelect(template);
  };

  return (
    <div className={`template-selector ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}  `}>
      <h2>Select a Content Template</h2>
      <div className="grid grid-cols-2 gap-4">
        {contentTemplates.map((template) => (
          <div
            key={template.name}
            className={`p-4 border  lg:flex lg:flex-col-3 gap-5 grid grid-cols-1 rounded ${selectedTemplate?.name === template.name 
              ? 'border-blue-500' 
              : mode === 'dark' 
                ? 'border-gray-600' 
                : 'border-gray-300'
            } ${mode === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
            onClick={() => handleSelect(template)}
          >
            <template.icon size={24} className={mode === 'dark' ? 'text-white' : 'text-black'} />
            <h3>{template.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
