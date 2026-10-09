import { MessageSquareText, Quote } from 'lucide-react';
import { useId } from 'react';
import { clientTestimonials, type ClientTestimonial } from '../../data/testimonials';
import { Reveal } from './Reveal';

// Pass approved records from src/data/testimonials.ts when real feedback is available.
// Placeholder or unverified entries never render as published client reviews.
export function Testimonials({ records = clientTestimonials }: { records?: readonly ClientTestimonial[] }) {
  const headingId = useId();
  const approved = records.filter(record => record.verified === true && record.placeholder !== true && record.quote.trim() && record.name.trim()).slice(0, 3);
  const isPreview = approved.length === 0;

  return (
    <section className={`testimonials-section section${isPreview ? ' testimonials-empty' : ''}`} aria-labelledby={headingId}>
      <Reveal className="testimonials-heading">
        <div>{!isPreview && <p className="eyebrow">CLIENT FEEDBACK</p>}<h2 id={headingId}>{isPreview ? 'Client feedback' : 'In their words.'}</h2></div>
        {isPreview && <div className="testimonials-empty-note"><MessageSquareText size={20} strokeWidth={1.5} aria-hidden="true" /><p>Verified reviews coming soon.</p></div>}
      </Reveal>
      {!isPreview && (
        <div className={`testimonials-grid testimonials-count-${approved.length}`}>
          {approved.map((record, index) => <Reveal className="testimonial-quote-card" key={`${record.name}-${index}`}><figure><Quote className="testimonial-quote-mark" size={30} strokeWidth={1.3} aria-hidden="true" /><blockquote><p>{record.quote.trim()}</p></blockquote><figcaption><span>{record.name.trim()}</span>{(record.role || record.company) && <small>{[record.role, record.company].filter(Boolean).join(' · ')}</small>}</figcaption></figure></Reveal>)}
        </div>
      )}
    </section>
  );
}
