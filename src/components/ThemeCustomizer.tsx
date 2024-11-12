import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { motion } from 'framer-motion';
import { Theme } from '../types/resume';

interface ThemeCustomizerProps {
  theme: Theme;
  onChange: (theme: Theme) => void;
}

const fonts = [
  { name: 'Modern', value: 'Inter, sans-serif' },
  { name: 'Professional', value: 'Georgia, serif' },
  { name: 'Clean', value: 'Arial, sans-serif' },
  { name: 'Elegant', value: 'Playfair Display, serif' }
];

export default function ThemeCustomizer({ theme, onChange }: ThemeCustomizerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 p-6 bg-white rounded-lg shadow-lg"
    >
      <div>
        <h3 className="text-lg font-semibold mb-3">Font Style</h3>
        <div className="grid grid-cols-2 gap-3">
          {fonts.map((font) => (
            <button
              key={font.value}
              onClick={() => onChange({ ...theme, fontFamily: font.value })}
              className={`p-3 rounded-lg text-left transition-all ${
                theme.fontFamily === font.value
                  ? 'bg-blue-100 border-blue-500'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              style={{ fontFamily: font.value }}
            >
              {font.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Colors</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Primary Color</label>
            <HexColorPicker
              color={theme.primaryColor}
              onChange={(color) => onChange({ ...theme, primaryColor: color })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Background Color</label>
            <HexColorPicker
              color={theme.backgroundColor}
              onChange={(color) => onChange({ ...theme, backgroundColor: color })}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}