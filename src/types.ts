export interface Lead {
  id: string;
  name: string;
  businessName: string;
  phone: string;
  whatsApp: string;
  email: string;
  serviceNeeded: string;
  notes: string;
  submittedAt: string;
  type: 'contact' | 'audit' | 'consultation' | 'callback';
  status: 'new' | 'contacted' | 'joined' | 'rejected';
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  platforms: string[];
}

export interface PricingTier {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular: boolean;
  ctaText: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  industry: string;
  platform: string;
  image: string;
  metrics: string[];
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  image: string;
  date: string;
  author: string;
}

export interface Testimonial {
  id: string;
  name: string;
  businessName: string;
  location: string;
  rating: number;
  review: string;
  avatar: string;
  tag: string;
}
