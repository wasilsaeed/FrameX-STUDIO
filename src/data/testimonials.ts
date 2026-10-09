export const testimonialPlaceholder = {
  quote: 'Reserved for a verified client perspective.',
  name: 'Client review coming soon',
  label: 'Placeholder — not a published testimonial',
};

export type ClientTestimonial = {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  verified: boolean;
  placeholder?: boolean;
};

// Add only approved, genuine client feedback. Unverified/placeholder entries stay hidden.
export const clientTestimonials: ClientTestimonial[] = [];

export type SampleTestimonial = {
  quote: string;
  category: string;
};

// Fictional examples for the user-approved layout preview, never verified feedback.
// Keep separate from clientTestimonials so they cannot be mistaken for real records.
export const sampleTestimonials: SampleTestimonial[] = [
  {
    category: 'Video & sound',
    quote: 'We sent over a folder of clips and a rough brief. The final cut had a much clearer story, and the dialogue was easier to follow.',
  },
  {
    category: 'Photo retouching',
    quote: 'The product colors stayed consistent across the set. Small marks were cleaned up, but the materials still had texture. Nothing looked overly retouched.',
  },
  {
    category: 'Client coordination',
    quote: 'Having the feedback organized in one place helped. We always knew which version to review, and the final files arrived in the formats we’d agreed on.',
  },
];
