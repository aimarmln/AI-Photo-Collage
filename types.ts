export interface ImageInfo {
  id: string;
  src: string;
}

export type TemplateKey = 'SQUARE' | 'RECTANGLE' | 'TRAPEZIUM' | 'RANDOM';

export interface Slot {
  id: number;
  clipPath: string;
  gridArea: string;
}

export interface Template {
  key: TemplateKey;
  name: string;
  slots: Slot[];
  gridTemplate: string;
  aspectRatio: string;
}

export interface CollageItem {
  slotId: number;
  image: ImageInfo | null;
}

export type DragSource = 'bin' | 'canvas';

export interface DragData {
    source: DragSource;
    imageId?: string; // For drags from the image bin
    slotId?: number; // For drags within the canvas
}