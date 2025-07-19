import React from 'react';
import { TEMPLATES } from '../constants';
import { TemplateKey } from '../types';

interface TemplateSelectorProps {
  onSelect: (key: TemplateKey) => void;
  selectedKey: TemplateKey;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect, selectedKey }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-300">2. Choose Template</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.values(TEMPLATES).map((template) => (
          <button
            key={template.key}
            onClick={() => onSelect(template.key)}
            className={`px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 ${
              selectedKey === template.key
                ? 'bg-indigo-600 text-white font-semibold shadow-lg'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            {template.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;