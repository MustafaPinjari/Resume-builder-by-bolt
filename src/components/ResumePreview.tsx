import React from 'react';
import { ResumeData } from '../types/resume';

interface ResumePreviewProps {
  data: ResumeData;
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white shadow-lg">
      <header className="border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-4xl font-bold text-gray-900">{data.basics.name}</h1>
        <p className="text-xl text-gray-600 mt-1">{data.basics.title}</p>
        <div className="flex flex-wrap gap-4 mt-3 text-gray-600">
          <span>{data.basics.email}</span>
          <span>{data.basics.phone}</span>
          <span>{data.basics.location}</span>
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Summary</h2>
        <p className="text-gray-700 leading-relaxed">{data.basics.summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Experience</h2>
        <div className="space-y-4">
          {data.experience.map((exp) => (
            <div key={exp.id}>
              <h3 className="text-xl font-semibold text-gray-800">
                {exp.position}
              </h3>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-gray-500 text-sm">
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-700">
                {exp.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill) => (
            <span
              key={skill.id}
              className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
            >
              {skill.name} • {skill.level}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}