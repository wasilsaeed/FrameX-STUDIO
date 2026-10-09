import { MessageSquareText } from 'lucide-react';
import { useId } from 'react';
import { testimonialPlaceholder, type ClientTestimonial } from '../../data/testimonials';
import { Reveal } from './Reveal';

// Pass approved records from src/data/testimonials.ts when real feedback is available.
// Placeholder or unverified entries never render as published client reviews.
export function Testimonials({ records = [] }: { records?: readonly ClientTestimonial[] }) {
  const headingId = useId();
  const approved = records.filter(record => record.verified === true && record.placeholder !== true && record.quote.trim() && record.name.trim()).slice(0, 3);
  const isPreview = approved.length === 0;

  return (
    <section className="testimonials-section section" aria-labelledby={headingId}>
      <Reveal className="testimonials-heading"><p className="eyebrow">CLIENT FEEDBACK</p><h2 id={headingId}>{isPreview ? 'Testimonial preview' : 'Client perspectives'}</h2></Reveal>
      {isPreview ? (
        <Reveal className="testimonial-preview-panel">
          <div className="testimonial-preview-icon" aria-hidden="true"><MessageSquareText /></div>
          <div role="group" aria-label={testimonialPlaceholder.label}><h3>Your client’s feedback belongs here.</h3><p>Verified quote and attribution to be added.</p></div>
        </Reveal>
      ) : (
        <div className={`testimonials-grid testimonials-count-${approved.length}`}>
          {approved.map((record, index) => <Reveal className="testimonial-quote-card" key={`${record.name}-${index}`}><figure><blockquote><p>{record.quote}</p></blockquote><figcaption><span>{record.name}</span>{(record.role || record.company) && <small>{[record.role, record.company].filter(Boolean).join(' · ')}</small>}</figcaption></figure></Reveal>)}
        </div>
      )}
    </section>
  );
}
