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
