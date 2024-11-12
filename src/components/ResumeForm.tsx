import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { ResumeData } from '../types/resume';
import ExperienceForm from './ExperienceForm';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        {
          id: crypto.randomUUID(),
          company: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
          achievements: [],
          technologies: [],
        },
      ],
    });
  };

  const updateExperience = (index: number, experience: ResumeData['experience'][0]) => {
    const newExperience = [...data.experience];
    newExperience[index] = experience;
    onChange({ ...data, experience: newExperience });
  };

  const removeExperience = (index: number) => {
    onChange({
      ...data,
      experience: data.experience.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="input-field"
            value={data.basics.name}
            onChange={(e) =>
              onChange({
                ...data,
                basics: { ...data.basics, name: e.target.value },
              })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={data.basics.email}
            onChange={(e) =>
              onChange({
                ...data,
                basics: { ...data.basics, email: e.target.value },
              })
            }
          />
          {/* Add more personal information fields */}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Work Experience</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addExperience}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Add Experience
          </motion.button>
        </div>
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <ExperienceForm
              key={exp.id}
              experience={exp}
              onChange={(updated) => updateExperience(index, updated)}
              onDelete={() => removeExperience(index)}
            />
          ))}
        </div>
      </motion.section>

      {/* Add more sections for Education, Skills, etc. */}
    </div>
  );
}