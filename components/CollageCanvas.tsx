import React, { useState } from 'react';
import { CollageItem, Template, DragData } from '../types';
import { ImageIcon } from './icons/ImageIcon';

interface CollageCanvasProps {
  template: Template;
  items: CollageItem[];
  onDrop: (dragData: DragData, targetSlotId: number) => void;
}

const CollageCanvas: React.FC<CollageCanvasProps> = ({ template, items, onDrop }) => {
  const [dragOverSlot, setDragOverSlot] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, slotId: number) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ source: 'canvas', slotId }));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, slotId: number) => {
    e.preventDefault();
    setDragOverSlot(slotId);
  };
  
  const handleDragLeave = () => {
    setDragOverSlot(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetSlotId: number) => {
    e.preventDefault();
    setDragOverSlot(null);
    try {
        const data = JSON.parse(e.dataTransfer.getData('application/json'));
        onDrop(data, targetSlotId);
    } catch (error) {
        console.error("Failed to parse drag data", error);
    }
  };

  return (
    <div
      className="grid gap-2 w-full max-w-4xl bg-gray-900 p-2 rounded-lg shadow-inner"
      style={{ 
        gridTemplate: template.gridTemplate,
        aspectRatio: template.aspectRatio,
      }}
    >
      {template.slots.map((slot) => {
        const item = items.find(i => i.slotId === slot.id);
        const isDragOver = dragOverSlot === slot.id;

        return (
          <div
            key={slot.id}
            onDragOver={(e) => handleDragOver(e, slot.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, slot.id)}
            style={{ 
                gridArea: slot.gridArea,
                clipPath: slot.clipPath,
            }}
            className={`relative w-full h-full bg-gray-700/50 transition-all duration-300 ${isDragOver ? 'ring-4 ring-indigo-500 ring-inset' : ''} ${item?.image ? 'cursor-grab active:cursor-grabbing' : ''}`}
            draggable={!!item?.image}
            onDragStart={item?.image ? (e) => handleDragStart(e, slot.id) : undefined}
          >
            {item?.image ? (
              <img
                src={item.image.src}
                alt={`collage-item-${item.slotId}`}
                className="w-full h-full object-cover pointer-events-none" // pointer-events-none is crucial
              />
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-500" />
                </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CollageCanvas;