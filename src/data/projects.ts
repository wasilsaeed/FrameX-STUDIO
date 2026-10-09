import type { Project } from '../types';

const media = {
  car: '/media/midnight-drive.jpg',
  fashion: '/media/modern-muse.jpg',
  product: '/media/pureform.jpg',
  city: '/media/city-after-dark.jpg',
  creator: '/media/creator-cuts.jpg',
  interior: '/media/timeless-spaces.jpg',
  motion: '/media/motion-theory.jpg',
  portrait: '/media/portrait-series.jpg',
  fitness: '/media/momentum.jpg',
  ecommerce: '/media/studio-essentials.jpg',
  youtube: '/media/frame-by-frame.jpg',
  golden: '/media/golden-hour.jpg',
};

const galleryAlt = [
  '/media/cinema-reference.jpg',
  '/media/landscape-reference.jpg',
];

export const projects: Project[] = [
  { id: 1, slug: 'midnight-drive', title: 'Midnight Drive', category: 'Cinematic Automotive Editing', filter: 'Video Editing', description: 'A nocturnal automotive concept shaped through decisive cuts, deep contrast, and controlled motion.', thumbnail: media.car, gallery: [media.car, ...galleryAlt], mediaType: 'video', services: ['Edit direction', 'Color grade', 'Sound design'], tools: [], featured: true, demo: true },
  { id: 2, slug: 'the-modern-muse', title: 'The Modern Muse', category: 'Fashion Photo Retouching', filter: 'Retouching', description: 'An editorial reference study exploring sculpted light and modern color. The comparison illustrates an alternate color treatment of the same photograph.', thumbnail: media.fashion, gallery: [media.fashion, media.portrait], mediaType: 'image', beforeImage: media.fashion, afterImage: media.fashion, services: ['Beauty retouching', 'Tone work', 'Finishing'], tools: [], featured: true, demo: true },
  { id: 3, slug: 'pureform', title: 'PureForm', category: 'Product Commercial', filter: 'Commercial', description: 'A minimal product film concept built around material, detail, and precise commercial pacing.', thumbnail: media.product, gallery: [media.product, media.ecommerce], mediaType: 'video', services: ['Commercial edit', 'Product cleanup', 'Sound design'], tools: [], featured: true, demo: true },
  { id: 4, slug: 'city-after-dark', title: 'City After Dark', category: 'Lifestyle / Travel Film', filter: 'Video Editing', description: 'An atmospheric city portrait where fleeting moments become a fluid after-hours narrative.', thumbnail: media.city, gallery: [media.city, galleryAlt[0]], mediaType: 'video', services: ['Story edit', 'Color grade', 'Audio mix'], tools: [], featured: true, demo: true },
  { id: 5, slug: 'creator-cuts', title: 'Creator Cuts', category: 'Short-Form Content', filter: 'Social Media', description: 'A flexible vertical content system pairing tight hooks, readable captions, and energetic pacing.', thumbnail: media.creator, gallery: [media.creator, media.youtube], mediaType: 'video', services: ['Vertical edits', 'Captions', 'Motion titles'], tools: [], featured: false, demo: true },
  { id: 6, slug: 'timeless-spaces', title: 'Timeless Spaces', category: 'Real Estate Photo Enhancement', filter: 'Photo Editing', description: 'An interior reference study exploring balanced light and clean color. The comparison illustrates two color treatments of the same photograph.', thumbnail: media.interior, gallery: [media.interior, galleryAlt[1]], mediaType: 'image', beforeImage: media.interior, afterImage: media.interior, services: ['Exposure blend', 'Perspective correction', 'Color work'], tools: [], featured: true, demo: true },
  { id: 7, slug: 'motion-theory', title: 'Motion Theory', category: 'Brand Promotional Editing', filter: 'Commercial', description: 'A visual identity in motion—rhythmic transitions and graphic moments built for a brand launch.', thumbnail: media.motion, gallery: [media.motion, media.product], mediaType: 'video', services: ['Promo edit', 'Motion graphics', 'Finishing'], tools: [], featured: false, demo: true },
  { id: 8, slug: 'portrait-series', title: 'The Portrait Series', category: 'Beauty Retouching', filter: 'Retouching', description: 'A portrait reference study exploring natural tone and expression. The comparison demonstrates an illustrative color treatment of the same photograph.', thumbnail: media.portrait, gallery: [media.portrait, media.fashion], mediaType: 'image', beforeImage: media.portrait, afterImage: media.portrait, services: ['Skin work', 'Color balance', 'Editorial finish'], tools: [], featured: false, demo: true },
  { id: 9, slug: 'momentum', title: 'Momentum', category: 'Fitness Commercial', filter: 'Commercial', description: 'A high-energy campaign concept cut around impact, effort, and moments of controlled intensity.', thumbnail: media.fitness, gallery: [media.fitness, media.city], mediaType: 'video', services: ['Campaign edit', 'Sound design', 'Cutdowns'], tools: [], featured: false, demo: true },
  { id: 10, slug: 'studio-essentials', title: 'Studio Essentials', category: 'E-Commerce Photography', filter: 'Photo Editing', description: 'A product reference study exploring clear, consistent storefront presentation. The comparison illustrates alternate color treatments of the same photograph.', thumbnail: media.ecommerce, gallery: [media.ecommerce, media.product], mediaType: 'image', beforeImage: media.ecommerce, afterImage: media.ecommerce, services: ['Product retouching', 'Background cleanup', 'Color matching'], tools: [], featured: false, demo: true },
  { id: 11, slug: 'frame-by-frame', title: 'Frame by Frame', category: 'YouTube Editing', filter: 'Video Editing', description: 'A long-form creator format balancing story, pace, graphics, and room for personality.', thumbnail: media.youtube, gallery: [media.youtube, media.creator], mediaType: 'video', services: ['Long-form edit', 'Graphics', 'Audio cleanup'], tools: [], featured: false, demo: true },
  { id: 12, slug: 'golden-hour', title: 'Golden Hour', category: 'Lifestyle Color Grading', filter: 'Video Editing', description: 'A lifestyle reference study exploring warmth and a restrained cinematic palette. The comparison illustrates alternate color treatments of the same photograph.', thumbnail: media.golden, gallery: [media.golden, galleryAlt[1]], mediaType: 'image', beforeImage: media.golden, afterImage: media.golden, services: ['Color correction', 'Look development', 'Shot matching'], tools: [], featured: false, demo: true },
];

export const filters = ['All Work', 'Video Editing', 'Photo Editing', 'Commercial', 'Social Media', 'Retouching'] as const;
