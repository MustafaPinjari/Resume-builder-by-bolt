import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Plus as PlusIcon } from 'lucide-react';
import { ResumeData } from '../types/resume';

interface ExperienceFormProps {
  experience: ResumeData['experience'][0];
  onChange: (experience: ResumeData['experience'][0]) => void;
  onDelete: () => void;
}

export default function ExperienceForm({ experience, onChange, onDelete }: ExperienceFormProps) {
  const addAchievement = () => {
    onChange({
      ...experience,
      achievements: [...experience.achievements, '']
    });
  };

  const updateAchievement = (index: number, value: string) => {
    const newAchievements = [...experience.achievements];
    newAchievements[index] = value;
    onChange({ ...experience, achievements: newAchievements });
  };

  const removeAchievement = (index: number) => {
    onChange({
      ...experience,
      achievements: experience.achievements.filter((_, i) => i !== index)
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 bg-white rounded-lg shadow-md space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            type="text"
            value={experience.company}
            onChange={(e) => onChange({ ...experience, company: e.target.value })}
            className="input-field"
            placeholder="Company name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Position
          </label>
          <input
            type="text"
            value={experience.position}
            onChange={(e) => onChange({ ...experience, position: e.target.value })}
            className="input-field"
            placeholder="Job title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={experience.location}
            onChange={(e) => onChange({ ...experience, location: e.target.value })}
            className="input-field"
            placeholder="City, Country"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={experience.startDate}
              onChange={(e) => onChange({ ...experience, startDate: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={experience.endDate}
              onChange={(e) => onChange({ ...experience, endDate: e.target.value })}
              disabled={experience.current}
              className="input-field"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={experience.description}
          onChange={(e) => onChange({ ...experience, description: e.target.value })}
          className="input-field min-h-[100px]"
          placeholder="Describe your role and responsibilities"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Key Achievements
          </label>
          <button
            onClick={addAchievement}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            <PlusIcon size={16} /> Add Achievement
          </button>
        </div>
        <AnimatePresence>
          {experience.achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex gap-2 mb-2"
            >
              <input
                type="text"
                value={achievement}
                onChange={(e) => updateAchievement(index, e.target.value)}
                className="input-field flex-1"
                placeholder="Describe your achievement"
              />
              <button
                onClick={() => removeAchievement(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onDelete}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700"
        >
          <Trash2 size={20} />
          Remove Experience
        </button>
      </div>
    </motion.div>
  );
}