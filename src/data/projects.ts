import type { Project } from '../types';

const media = {
  car: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=85',
  fashion: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1800&q=85',
  product: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1800&q=85',
  city: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1800&q=85',
  creator: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1800&q=85',
  interior: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85',
  motion: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1800&q=85',
  portrait: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1800&q=85',
  fitness: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1800&q=85',
  ecommerce: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1800&q=85',
  youtube: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1800&q=85',
  golden: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85',
};

const galleryAlt = [
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=82',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=82',
];

export const projects: Project[] = [
  { id: 1, slug: 'midnight-drive', title: 'Midnight Drive', category: 'Cinematic Automotive Editing', filter: 'Video Editing', description: 'A nocturnal automotive concept shaped through decisive cuts, deep contrast, and controlled motion.', thumbnail: media.car, gallery: [media.car, ...galleryAlt], mediaType: 'video', services: ['Edit direction', 'Color grade', 'Sound design'], tools: ['Premiere Pro', 'DaVinci Resolve'], featured: true, demo: true },
  { id: 2, slug: 'the-modern-muse', title: 'The Modern Muse', category: 'Fashion Photo Retouching', filter: 'Retouching', description: 'An editorial portrait study balancing considered skin work with sculpted light and modern color.', thumbnail: media.fashion, gallery: [media.fashion, media.portrait], mediaType: 'image', beforeImage: media.portrait, afterImage: media.fashion, services: ['Beauty retouching', 'Tone work', 'Finishing'], tools: ['Photoshop', 'Capture One'], featured: true, demo: true },
  { id: 3, slug: 'pureform', title: 'PureForm', category: 'Product Commercial', filter: 'Commercial', description: 'A minimal product film concept built around material, detail, and precise commercial pacing.', thumbnail: media.product, gallery: [media.product, media.ecommerce], mediaType: 'video', services: ['Commercial edit', 'Product cleanup', 'Sound design'], tools: ['Premiere Pro', 'After Effects'], featured: true, demo: true },
  { id: 4, slug: 'city-after-dark', title: 'City After Dark', category: 'Lifestyle / Travel Film', filter: 'Video Editing', description: 'An atmospheric city portrait where fleeting moments become a fluid after-hours narrative.', thumbnail: media.city, gallery: [media.city, galleryAlt[0]], mediaType: 'video', services: ['Story edit', 'Color grade', 'Audio mix'], tools: ['Premiere Pro', 'DaVinci Resolve'], featured: true, demo: true },
  { id: 5, slug: 'creator-cuts', title: 'Creator Cuts', category: 'Short-Form Content', filter: 'Social Media', description: 'A flexible vertical content system pairing tight hooks, readable captions, and energetic pacing.', thumbnail: media.creator, gallery: [media.creator, media.youtube], mediaType: 'video', services: ['Vertical edits', 'Captions', 'Motion titles'], tools: ['Premiere Pro', 'After Effects'], featured: false, demo: true },
  { id: 6, slug: 'timeless-spaces', title: 'Timeless Spaces', category: 'Real Estate Photo Enhancement', filter: 'Photo Editing', description: 'Natural interior enhancement with balanced exposure, straight geometry, and clean color.', thumbnail: media.interior, gallery: [media.interior, galleryAlt[1]], mediaType: 'image', beforeImage: galleryAlt[1], afterImage: media.interior, services: ['Exposure blend', 'Perspective correction', 'Color work'], tools: ['Lightroom', 'Photoshop'], featured: true, demo: true },
  { id: 7, slug: 'motion-theory', title: 'Motion Theory', category: 'Brand Promotional Editing', filter: 'Commercial', description: 'A visual identity in motion—rhythmic transitions and graphic moments built for a brand launch.', thumbnail: media.motion, gallery: [media.motion, media.product], mediaType: 'video', services: ['Promo edit', 'Motion graphics', 'Finishing'], tools: ['After Effects', 'Premiere Pro'], featured: false, demo: true },
  { id: 8, slug: 'portrait-series', title: 'The Portrait Series', category: 'Beauty Retouching', filter: 'Retouching', description: 'Natural high-end portrait finishing that keeps texture present and attention on expression.', thumbnail: media.portrait, gallery: [media.portrait, media.fashion], mediaType: 'image', beforeImage: media.fashion, afterImage: media.portrait, services: ['Skin work', 'Color balance', 'Editorial finish'], tools: ['Photoshop', 'Capture One'], featured: false, demo: true },
  { id: 9, slug: 'momentum', title: 'Momentum', category: 'Fitness Commercial', filter: 'Commercial', description: 'A high-energy campaign concept cut around impact, effort, and moments of controlled intensity.', thumbnail: media.fitness, gallery: [media.fitness, media.city], mediaType: 'video', services: ['Campaign edit', 'Sound design', 'Cutdowns'], tools: ['Premiere Pro', 'After Effects'], featured: false, demo: true },
  { id: 10, slug: 'studio-essentials', title: 'Studio Essentials', category: 'E-Commerce Photography', filter: 'Photo Editing', description: 'A clean product series developed for consistent storefront presentation across a full catalog.', thumbnail: media.ecommerce, gallery: [media.ecommerce, media.product], mediaType: 'image', beforeImage: media.product, afterImage: media.ecommerce, services: ['Product retouching', 'Background cleanup', 'Color matching'], tools: ['Photoshop', 'Lightroom'], featured: false, demo: true },
  { id: 11, slug: 'frame-by-frame', title: 'Frame by Frame', category: 'YouTube Editing', filter: 'Video Editing', description: 'A long-form creator format balancing story, pace, graphics, and room for personality.', thumbnail: media.youtube, gallery: [media.youtube, media.creator], mediaType: 'video', services: ['Long-form edit', 'Graphics', 'Audio cleanup'], tools: ['Premiere Pro', 'After Effects'], featured: false, demo: true },
  { id: 12, slug: 'golden-hour', title: 'Golden Hour', category: 'Lifestyle Color Grading', filter: 'Video Editing', description: 'A warm lifestyle study built through careful shot matching and a restrained cinematic palette.', thumbnail: media.golden, gallery: [media.golden, galleryAlt[1]], mediaType: 'image', beforeImage: galleryAlt[1], afterImage: media.golden, services: ['Color correction', 'Look development', 'Shot matching'], tools: ['DaVinci Resolve'], featured: false, demo: true },
];

export const filters = ['All Work', 'Video Editing', 'Photo Editing', 'Commercial', 'Social Media', 'Retouching'] as const;
