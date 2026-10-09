import { MessageSquareText, Quote } from 'lucide-react';
import { useId } from 'react';
import { clientTestimonials, type ClientTestimonial, type SampleTestimonial } from '../../data/testimonials';
import { Reveal } from './Reveal';

// Pass approved records from src/data/testimonials.ts when real feedback is available.
// Unverified client records never render. Samples are explicitly opted in and labeled.
export function Testimonials({ records = clientTestimonials, sampleRecords = [] }: { records?: readonly ClientTestimonial[]; sampleRecords?: readonly SampleTestimonial[] }) {
  const headingId = useId();
  const disclosureId = `${headingId}-samples`;
  const approved = records.filter(record => record.verified === true && record.placeholder !== true && record.quote.trim() && record.name.trim()).slice(0, 3);
  const examples = sampleRecords.filter(record => record.quote.trim() && record.category.trim()).slice(0, 3);
  const showingSamples = approved.length === 0 && examples.length > 0;
  const displayed = approved.length > 0
    ? approved.map(record => ({ quote: record.quote.trim(), name: record.name.trim(), attribution: [record.role, record.company].filter(Boolean).join(' · '), sample: false }))
    : examples.map(record => ({ quote: record.quote.trim(), name: record.category.trim(), attribution: 'Sample review · Illustrative only', sample: true }));
  const isEmpty = displayed.length === 0;

  return (
    <section className={`testimonials-section section${isEmpty ? ' testimonials-empty' : ''}${showingSamples ? ' testimonials-samples' : ''}`} aria-labelledby={headingId} aria-describedby={showingSamples ? disclosureId : undefined}>
      <Reveal className="testimonials-heading">
        <div>{!isEmpty && <p className="eyebrow">{showingSamples ? 'CLIENT FEEDBACK / PREVIEW' : 'CLIENT FEEDBACK'}</p>}<h2 id={headingId}>{isEmpty || showingSamples ? 'Client feedback' : 'In their words.'}</h2></div>
        {showingSamples && <p className="testimonials-sample-note" id={disclosureId}>Sample reviews for layout preview.<br />Not actual client testimonials.</p>}
        {isEmpty && <div className="testimonials-empty-note"><MessageSquareText size={20} strokeWidth={1.5} aria-hidden="true" /><p>Verified reviews coming soon.</p></div>}
      </Reveal>
      {!isEmpty && (
        <div className={`testimonials-grid testimonials-count-${displayed.length}`}>
          {displayed.map((record, index) => <Reveal className={`testimonial-quote-card${record.sample ? ' testimonial-sample-card' : ''}`} key={`${record.name}-${index}`}><figure><Quote className="testimonial-quote-mark" size={30} strokeWidth={1.3} aria-hidden="true" /><blockquote><p>{record.quote}</p></blockquote><figcaption><span>{record.name}</span>{record.attribution && <small className={record.sample ? 'testimonial-sample-label' : undefined}>{record.attribution}</small>}</figcaption></figure></Reveal>)}
        </div>
      )}
    </section>
  );
}
