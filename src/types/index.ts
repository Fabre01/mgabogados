export type PracticeAreaId =
  | 'penal'
  | 'bienes_raices'
  | 'corporativo'
  | 'civil_sucesiones'
  | 'familia'
  | 'migracion';

export interface PracticeArea {
  id: PracticeAreaId;
  title: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  keyAspects: string[];
  phases?: {
    name: string;
    description: string;
  }[];
}

export type ConsultationModality = 'presencial' | 'virtual';

export interface Appointment {
  id: string;
  code: string;
  fullName: string;
  idDocument: string; // Cédula o Pasaporte
  email: string;
  phone: string;
  practiceArea: PracticeAreaId;
  modality: ConsultationModality;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g., "09:30 AM"
  notes: string;
  status: 'confirmada' | 'en_revision' | 'completada' | 'cancelada';
  createdAt: string;
  attorney: string;
}

export interface LegalArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: PracticeAreaId | 'legislacion' | 'consejos';
  readTime: string;
  publishedDate: string;
  author: {
    name: string;
    title: string;
    avatar?: string;
  };
  featured?: boolean;
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string[];
      highlight?: string;
    }[];
    legalReferences: string[];
    takeaway: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'attorney';
  text: string;
  timestamp: string;
  quickReplies?: string[];
  actionLink?: {
    label: string;
    urlOrAction: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experienceTag: string;
  image: string;
  bio: string;
  keyAreas: string[];
}

