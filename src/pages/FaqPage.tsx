import { Plus } from 'lucide-react';
import { useState } from 'react';
import { CTA } from '../components/common/CTA';
import { Seo } from '../components/common/Seo';
import { faqs } from '../data/faq';

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  return <>
    <Seo title="Frequently Asked Questions" description="Answers about FrameX Studio projects, timelines, revisions, files, and recurring editing support." />
    <section className="page-hero faq-hero"><p className="eyebrow">GOOD QUESTIONS / CLEAR ANSWERS</p><h1>Before we<br /><em>begin.</em></h1><p>The practical details, kept simple.</p></section>
    <section className="faq-list section">{faqs.map(([question, answer], index) => <div className={`faq-item ${open === index ? 'open' : ''}`} key={question}><h2><button onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index} aria-controls={`answer-${index}`}><span>{String(index + 1).padStart(2, '0')} / {question}</span><Plus /></button></h2><div id={`answer-${index}`} role="region" className="faq-answer"><p>{answer}</p></div></div>)}</section>
    <CTA />
  </>;
}
