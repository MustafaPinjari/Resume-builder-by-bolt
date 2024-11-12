import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown, FileUp, Palette, Edit2, Eye } from 'lucide-react';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import FileImporter from './components/FileImporter';
import ThemeCustomizer from './components/ThemeCustomizer';
import { ResumeData, Theme } from './types/resume';

const initialTheme: Theme = {
  fontFamily: 'Inter, sans-serif',
  primaryColor: '#2563eb',
  secondaryColor: '#1e40af',
  backgroundColor: '#ffffff',
  textColor: '#111827',
};

const initialData: ResumeData = {
  basics: {
    name: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    summary: '',
    linkedin: '',
    website: '',
  },
  experience: [],
  education: [],
  skills: [],
  theme: initialTheme,
};

export default function App() {
  const [data, setData] = useState<ResumeData>(initialData);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [showThemeCustomizer, setShowThemeCustomizer] = useState(false);
  const [showImporter, setShowImporter] = useState(false);

  const exportResume = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: data.theme.fontFamily }}>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold"
              style={{ color: data.theme.primaryColor }}
            >
              Resume Builder
            </motion.h1>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowImporter(!showImporter)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FileUp size={20} />
                Import
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportResume}
                className="flex items-center gap-2 px-4 py-2"
                style={{ backgroundColor: data.theme.primaryColor }}
                className="text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <FileDown size={20} />
                Export
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowThemeCustomizer(!showThemeCustomizer)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Palette size={20} />
                Customize
              </motion.button>
            </div>
          </div>
          <div className="flex gap-4 -mb-px">
            <button
              className={`py-2 px-4 border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'edit'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('edit')}
            >
              <Edit2 size={18} />
              Edit
            </button>
            <button
              className={`py-2 px-4 border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'preview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('preview')}
            >
              <Eye size={18} />
              Preview
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <AnimatePresence>
          {showImporter && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <FileImporter
                onImport={(importedData) => {
                  setData({ ...data, ...importedData });
                  setShowImporter(false);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showThemeCustomizer && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <ThemeCustomizer
                theme={data.theme}
                onChange={(newTheme) => setData({ ...data, theme: newTheme })}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {activeTab === 'edit' ? (
            <ResumeForm data={data} onChange={setData} />
          ) : (
            <ResumePreview data={data} />
          )}
        </motion.div>
      </main>
    </div>
  );
}