export interface Service {
  id: string;
  title: string;
  description: string;
  category: 'Automation' | 'Development' | 'Consulting' | 'Security' | 'Communication' | 'Sales' | 'Data' | 'Content';
  icon: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  result: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}