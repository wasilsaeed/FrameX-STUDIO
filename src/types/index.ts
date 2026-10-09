export type Project = {
  id: number;
  slug: string;
  title: string;
  category: string;
  filter: 'Video Editing' | 'Photo Editing' | 'Commercial' | 'Social Media' | 'Retouching';
  description: string;
  thumbnail: string;
  gallery: string[];
  mediaType: 'image' | 'video';
  videoSource?: string;
  beforeImage?: string;
  afterImage?: string;
  services: string[];
  tools: string[];
  featured: boolean;
  demo: boolean;
};

export type Service = {
  number: string;
  title: string;
  category: 'Video' | 'Photo' | 'Support';
  description: string;
  deliverables: string[];
  useCases: string[];
  image: string;
};
