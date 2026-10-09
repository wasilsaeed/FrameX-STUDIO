import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CTA } from '../components/common/CTA';
import { Reveal } from '../components/common/Reveal';
import { Seo } from '../components/common/Seo';
import { faqs } from '../data/faq';

const questions = [faqs[0], faqs[2], faqs[4], faqs[5], faqs[7], faqs[8], faqs[6], faqs[11]];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  return <>
    <Seo title="Frequently Asked Questions" description="Clear answers about briefs, timelines, quotes, revisions, files, and ongoing creative support." />
    <section className="editorial-hero faq-hero">
      <Reveal className="editorial-hero-heading"><p className="eyebrow">GOOD QUESTIONS</p><h1>Before we<br /><em>begin.</em></h1></Reveal>
      <Reveal className="editorial-hero-copy"><p>The practical details, kept simple. Have a different question? Send us a brief and we’ll talk it through.</p><Link className="button" to="/contact">Start a project <ArrowUpRight aria-hidden="true" /></Link></Reveal>
    </section>
    <section className="faq-section section" aria-label="Frequently asked questions"><Reveal className="faq-list">{questions.map(([question, answer], index) => <div className={'faq-item ' + (open === index ? 'open' : '')} key={question}>
      <h2><button type="button" id={'faq-question-' + index} onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index} aria-controls={'faq-answer-' + index}><span>{question}</span><motion.span className="faq-toggle-icon" animate={{ rotate: open === index ? 45 : 0 }} transition={{ duration: reduceMotion ? 0 : .2 }}><Plus aria-hidden="true" /></motion.span></button></h2>
      <div id={'faq-answer-' + index} role="region" aria-labelledby={'faq-question-' + index} aria-hidden={open !== index}><AnimatePresence initial={false}>{open === index && <motion.div className="faq-answer" key="answer" initial={{ height: reduceMotion ? 'auto' : 0, opacity: reduceMotion ? 1 : 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: reduceMotion ? 'auto' : 0, opacity: reduceMotion ? 1 : 0 }} transition={{ duration: reduceMotion ? 0 : .25, ease: [.25, .1, .25, 1] }}><p>{answer}</p></motion.div>}</AnimatePresence></div>
    </div>)}</Reveal></section>
    <CTA />
  </>;
}
