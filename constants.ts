import { Template, TemplateKey } from './types';

export const TEMPLATES: Record<TemplateKey, Template> = {
  SQUARE: {
    key: 'SQUARE',
    name: 'Square',
    aspectRatio: '1 / 1',
    gridTemplate: `
      "a b"
      "c d"
    `,
    slots: [
      { id: 1, gridArea: 'a', clipPath: 'inset(0)' },
      { id: 2, gridArea: 'b', clipPath: 'inset(0)' },
      { id: 3, gridArea: 'c', clipPath: 'inset(0)' },
      { id: 4, gridArea: 'd', clipPath: 'inset(0)' },
    ],
  },
  RECTANGLE: {
    key: 'RECTANGLE',
    name: 'Rectangle',
    aspectRatio: '16 / 9',
    gridTemplate: `
      "a a b"
      "c d d"
    `,
    slots: [
      { id: 1, gridArea: 'a', clipPath: 'inset(0)' },
      { id: 2, gridArea: 'b', clipPath: 'inset(0)' },
      { id: 3, gridArea: 'c', clipPath: 'inset(0)' },
      { id: 4, gridArea: 'd', clipPath: 'inset(0)' },
    ],
  },
  TRAPEZIUM: {
    key: 'TRAPEZIUM',
    name: 'Trapezium',
    aspectRatio: '16 / 9',
    gridTemplate: `
      "a b"
      "c d"
    `,
    slots: [
      { id: 1, gridArea: 'a', clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)' },
      { id: 2, gridArea: 'b', clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)' },
      { id: 3, gridArea: 'c', clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)' },
      { id: 4, gridArea: 'd', clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)' },
    ],
  },
  RANDOM: {
    key: 'RANDOM',
    name: 'Mosaic',
    aspectRatio: '4 / 3',
    gridTemplate: `
      "a a b e"
      "c d d e"
      "c f g g"
    `,
    slots: [
      { id: 1, gridArea: 'a', clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' },
      { id: 2, gridArea: 'b', clipPath: 'polygon(0 0, 100% 20%, 100% 100%, 0 100%)' },
      { id: 3, gridArea: 'c', clipPath: 'polygon(0 20%, 100% 0, 100% 100%, 0 80%)' },
      { id: 4, gridArea: 'd', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20% 100%)' },
      { id: 5, gridArea: 'e', clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)' },
      { id: 6, gridArea: 'f', clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' },
      { id: 7, gridArea: 'g', clipPath: 'polygon(0 0, 100% 20%, 100% 80%, 0 100%)' },
    ],
  },
};