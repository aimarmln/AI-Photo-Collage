import React from 'react';
import PhotoUploader from './PhotoUploader';
import TemplateSelector from './TemplateSelector';
import { ImageInfo, TemplateKey } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { LoaderIcon } from './icons/LoaderIcon';

interface ControlsProps {
    onPhotosUpload: (photos: ImageInfo[]) => void;
    uploadedImages: ImageInfo[];
    onTemplateSelect: (key: TemplateKey) => void;
    selectedTemplateKey: TemplateKey;
    onSmartArrange: () => void;
    isLoading: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
    onPhotosUpload,
    uploadedImages,
    onTemplateSelect,
    selectedTemplateKey,
    onSmartArrange,
    isLoading
}) => {
    return (
        <div className="flex flex-col gap-8">
            <PhotoUploader onPhotosUpload={onPhotosUpload} uploadedImages={uploadedImages} />
            <TemplateSelector onSelect={onTemplateSelect} selectedKey={selectedTemplateKey} />
            <div>
                <h2 className="text-xl font-bold mb-4 text-gray-300">Actions</h2>
                <button
                    onClick={onSmartArrange}
                    disabled={isLoading || uploadedImages.length === 0}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                >
                    {isLoading ? (
                        <>
                            <LoaderIcon className="animate-spin h-5 w-5" />
                            <span>Arranging...</span>
                        </>
                    ) : (
                        <>
                            <SparklesIcon className="h-5 w-5" />
                            <span>Smart Arrange</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};