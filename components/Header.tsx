import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => (
  <header className="flex items-center justify-center sm:justify-start">
    <div className="flex items-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600">
      <SparklesIcon className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tighter">
        AI Photo Collage
      </h1>
    </div>
  </header>
);