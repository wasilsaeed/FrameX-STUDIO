import type { Service } from '../types';

export const services: Service[] = [
  {
    number: '01', title: 'Video Editing', category: 'Video',
    description: 'Story-first edits with clean pacing, purposeful sound, and a finish that feels unmistakably yours.',
    deliverables: ['Long-form edits', 'Commercial cuts', 'Color finishing'],
    useCases: ['YouTube', 'Brand films', 'Campaigns'],
    image: '/media/service-video-editing.jpg',
  },
  {
    number: '02', title: 'Photo Retouching', category: 'Photo',
    description: 'Refined retouching that protects texture, tone, and the honest character of every image.',
    deliverables: ['Beauty retouching', 'Product cleanup', 'Color matching'],
    useCases: ['Editorial', 'E-commerce', 'Portraits'],
    image: '/media/service-photo-retouching.jpg',
  },
  {
    number: '03', title: 'Short-Form Content', category: 'Video',
    description: 'Fast, platform-native storytelling engineered to hold attention without losing brand polish.',
    deliverables: ['Vertical edits', 'Captions', 'Motion titles'],
    useCases: ['Reels', 'Shorts', 'TikTok'],
    image: '/media/service-short-form.jpg',
  },
  {
    number: '04', title: 'Commercial Editing', category: 'Video',
    description: 'High-impact campaign edits that shape product, message, and mood into one sharp visual story.',
    deliverables: ['Master cut', 'Social cutdowns', 'Sound design'],
    useCases: ['Launches', 'Ads', 'Brand campaigns'],
    image: '/media/service-commercial.jpg',
  },
  {
    number: '05', title: 'Color Grading', category: 'Video',
    description: 'Cohesive color with the contrast, atmosphere, and visual rhythm your story needs.',
    deliverables: ['Shot matching', 'Look development', 'Final grade'],
    useCases: ['Films', 'Music', 'Lifestyle'],
    image: '/media/service-color-grading.jpg',
  },
  {
    number: '06', title: 'Ongoing Creative Support', category: 'Support',
    description: 'A reliable post-production extension for creators, brands, and agencies with recurring needs.',
    deliverables: ['Monthly capacity', 'Shared workflow', 'Consistent delivery'],
    useCases: ['Creators', 'Agencies', 'Content teams'],
    image: '/media/service-creative-support.jpg',
  },
];
