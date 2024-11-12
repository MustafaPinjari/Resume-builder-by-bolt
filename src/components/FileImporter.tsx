import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { FileUp, File } from 'lucide-react';
import { createWorker } from 'tesseract.js';
import mammoth from 'mammoth';
import { ResumeData } from '../types/resume';

interface FileImporterProps {
  onImport: (data: Partial<ResumeData>) => void;
}

export default function FileImporter({ onImport }: FileImporterProps) {
  const processFile = async (file: File) => {
    try {
      if (file.type === 'application/pdf') {
        // Process PDF using pdf.js-extract
        const PDFExtract = (await import('pdf.js-extract')).PDFExtract;
        const pdfExtract = new PDFExtract();
        const data = await pdfExtract.extract(file);
        const text = data.pages.map(page => page.content.map(item => item.str).join(' ')).join('\n');
        extractDataFromText(text);
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // Process DOCX
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        extractDataFromText(result.value);
      } else if (file.type.startsWith('image/')) {
        // Process Image using Tesseract.js
        const worker = await createWorker('eng');
        const { data: { text } } = await worker.recognize(file);
        await worker.terminate();
        extractDataFromText(text);
      } else if (file.type === 'application/json') {
        // Process JSON
        const text = await file.text();
        const data = JSON.parse(text);
        onImport(data);
      }
    } catch (error) {
      console.error('Error processing file:', error);
    }
  };

  const extractDataFromText = (text: string) => {
    // Basic extraction logic - this can be enhanced with AI/ML for better accuracy
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = text.match(/(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
    const nameMatch = text.match(/^([A-Z][a-z]+\s)+[A-Z][a-z]+/m);

    const partialData: Partial<ResumeData> = {
      basics: {
        name: nameMatch?.[0] || '',
        email: emailMatch?.[0] || '',
        phone: phoneMatch?.[0] || '',
        location: '',
        title: '',
        summary: '',
      },
      experience: [],
      education: [],
      skills: []
    };

    onImport(partialData);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(processFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/json': ['.json']
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          {isDragActive ? (
            <FileUp className="w-12 h-12 text-blue-500" />
          ) : (
            <File className="w-12 h-12 text-gray-400" />
          )}
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-700">
              {isDragActive ? 'Drop your file here' : 'Drag & drop your resume file'}
            </p>
            <p className="text-sm text-gray-500">
              Supports PDF, DOCX, Images, and JSON
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}