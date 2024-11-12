export interface Theme {
  fontFamily: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  isDarkMode: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  startDate: string;
  endDate?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface ResumeData {
  basics: {
    name: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    summary: string;
    linkedin?: string;
    github?: string;
    website?: string;
    photo?: string;
  };
  experience: {
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievements: string[];
    technologies: string[];
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    achievements: string[];
  }[];
  skills: {
    id: string;
    category: string;
    items: {
      name: string;
      level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    }[];
  }[];
  certifications: Certification[];
  projects: Project[];
  achievements: Achievement[];
  languages: {
    id: string;
    name: string;
    proficiency: 'Basic' | 'Intermediate' | 'Fluent' | 'Native';
  }[];
  theme: Theme;
}