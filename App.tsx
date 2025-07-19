import React, { useState, useCallback, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import { ImageInfo, TemplateKey, CollageItem, DragData } from './types';
import { TEMPLATES } from './constants';
import CollageCanvas from './components/CollageCanvas';
import { generateSmartCollage } from './services/geminiService';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { ImageIcon } from './components/icons/ImageIcon';

const App: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<ImageInfo[]>([]);
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<TemplateKey>('SQUARE');
  const [collageItems, setCollageItems] = useState<CollageItem[]>(
    TEMPLATES.SQUARE.slots.map(slot => ({ slotId: slot.id, image: null }))
  );
  const [isLoading, setIsLoading] = useState(false);

  const handlePhotosUpload = useCallback((photos: ImageInfo[]) => {
    setUploadedImages(prev => [...prev, ...photos]);
  }, []);
  
  const handleTemplateSelect = useCallback((key: TemplateKey) => {
    setSelectedTemplateKey(key);
    setCollageItems(currentItems => {
        const newTemplate = TEMPLATES[key];
        const newItems: CollageItem[] = newTemplate.slots.map(slot => ({ slotId: slot.id, image: null }));
        
        const currentImages = currentItems.map(item => item.image).filter(Boolean) as ImageInfo[];
        currentImages.forEach((img, index) => {
            if(index < newItems.length) {
                newItems[index].image = img;
            }
        });

        return newItems;
    });
  }, []);

  const handleDropOnCanvas = useCallback((dragData: DragData, targetSlotId: number) => {
    setCollageItems(currentItems => {
        const newItems = [...currentItems];
        const targetIndex = newItems.findIndex(item => item.slotId === targetSlotId);

        if (targetIndex === -1) return currentItems;

        if (dragData.source === 'bin') {
            const draggedImage = uploadedImages.find(img => img.id === dragData.imageId);
            if (!draggedImage) return currentItems;
            
            const existingItemIndex = newItems.findIndex(item => item.image?.id === draggedImage.id);

            if (existingItemIndex !== -1) {
                // Image is already on canvas, perform a swap.
                const sourceImage = newItems[existingItemIndex].image;
                newItems[existingItemIndex].image = newItems[targetIndex].image;
                newItems[targetIndex].image = sourceImage;
            } else {
                // Image is not on canvas, just place it.
                newItems[targetIndex].image = draggedImage;
            }
        } else if (dragData.source === 'canvas') {
            // Swap images within canvas
            const sourceIndex = newItems.findIndex(item => item.slotId === dragData.slotId);
            if (sourceIndex !== -1) {
                const sourceImage = newItems[sourceIndex].image;
                newItems[sourceIndex].image = newItems[targetIndex].image;
                newItems[targetIndex].image = sourceImage;
            }
        }
        return newItems;
    });
  }, [uploadedImages]);

  const handleSmartArrange = useCallback(async () => {
    if (uploadedImages.length === 0) {
      alert("Please upload some images first.");
      return;
    }
    setIsLoading(true);
    try {
      const imageSrcs = uploadedImages.map(img => img.src);
      const { templateKey, arrangement } = await generateSmartCollage(imageSrcs);
      
      const newTemplateKey = TEMPLATES[templateKey] ? templateKey : 'RANDOM';
      setSelectedTemplateKey(newTemplateKey);

      const newTemplate = TEMPLATES[newTemplateKey];
      const newItems = newTemplate.slots.map(slot => {
          const arrangedItem = arrangement.find(a => a.slotId === slot.id);
          if (arrangedItem) {
              const image = uploadedImages.find(img => img.src === arrangedItem.imageSrc);
              return { slotId: slot.id, image: image || null };
          }
          return { slotId: slot.id, image: null };
      });
      
      setCollageItems(newItems);

    } catch (error) {
      console.error("Failed to generate smart collage:", error);
      alert("Could not generate a smart layout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [uploadedImages]);

  const selectedTemplate = TEMPLATES[selectedTemplateKey];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col p-4 sm:p-6 lg:p-8 font-sans">
      <Header />
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        <Controls
            onPhotosUpload={handlePhotosUpload}
            uploadedImages={uploadedImages}
            onTemplateSelect={handleTemplateSelect}
            selectedTemplateKey={selectedTemplateKey}
            onSmartArrange={handleSmartArrange}
            isLoading={isLoading}
        />
        
        <div className="lg:col-span-2 bg-gray-800/50 rounded-2xl p-4 sm:p-6 flex items-center justify-center shadow-2xl shadow-black/30">
          {collageItems.every(item => item.image === null) ? (
            <div className="text-center text-gray-400 flex flex-col items-center">
              <ImageIcon className="w-24 h-24 mb-4 text-gray-600" />
              <h3 className="text-2xl font-bold">Your Collage Awaits</h3>
              <p className="mt-2 max-w-sm">Upload your photos, choose a template, and drag your images here to start creating.</p>
            </div>
          ) : (
             <CollageCanvas
                template={selectedTemplate}
                items={collageItems}
                onDrop={handleDropOnCanvas}
              />
          )}
        </div>
      </main>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default App;