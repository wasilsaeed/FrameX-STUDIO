import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, FileText, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Seo } from '../components/common/Seo';
import { Reveal } from '../components/common/Reveal';
import { CTA } from '../components/common/CTA';
import { Testimonials } from '../components/common/Testimonials';
import { ProjectCard } from '../components/portfolio/ProjectCard';
import { projects } from '../data/projects';
import { clientTestimonials, sampleTestimonials } from '../data/testimonials';

const capabilities = [
  { label: 'Video editing', code: '01 / EDIT', title: 'Find the story.\nKeep the attention.', copy: 'A considered cut turns your footage into something people stay with. From the first hook to the last frame.', detail: ['Story & pacing', 'Motion titles', 'Platform-ready cuts'], service: 'Video editing', image: '/media/creator-cuts.jpg', imageLabel: 'Story / Rhythm / Motion', finish: 'Picture edit → Final cut' },
  { label: 'Photo retouching', code: '02 / RETOUCH', title: 'Refined detail.\nStill unmistakably real.', copy: 'Clean distractions, balance light, and bring the subject forward. A polished finish that respects the original image.', detail: ['Portraits & beauty', 'Product cleanup', 'Color consistency'], service: 'Photo retouching', image: '/media/modern-muse.jpg', imageLabel: 'Texture / Light / Detail', finish: 'Image refinement → Final set' },
  { label: 'Color & sound', code: '03 / FINISH', title: 'Set the mood.\nMake it feel complete.', copy: 'A coherent look and a clean mix bring the edit together. The finishing touches you notice—and the ones you simply feel.', detail: ['Color grading', 'Shot matching', 'Audio cleanup & mix'], service: 'Color grading', image: '/media/midnight-drive.jpg', imageLabel: 'Tone / Atmosphere / Mix', finish: 'Look development → Final master' },
];
const steps = [
  { icon: FileText, title: 'Align on the brief', copy: 'Share your files and references. We agree the scope, timing, and delivery formats before the edit begins.', tag: 'Brief / Scope / Direction' },
  { icon: SlidersHorizontal, title: 'Edit. Review. Refine.', copy: 'Your editor shapes the work. Your point of contact gathers feedback and keeps each revision clear.', tag: 'First cut / Feedback / Finish' },
  { icon: Check, title: 'Ready for your audience', copy: 'Receive the agreed files, checked and organized for the platforms where your work will live.', tag: 'Quality check / Export / Handoff' },
];

export default function HomePage() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [slider, setSlider] = useState({ index: 0, atStart: true, atEnd: false });
  const [activeService, setActiveService] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 35]);
  const featured = projects.filter(project => [1, 2, 3, 4, 6, 11].includes(project.id));
  const capability = capabilities[activeService];

  useEffect(() => {
    const track = sliderRef.current;
    if (!track) return;
    const update = () => {
      const item = track.querySelector<HTMLElement>('.slider-item');
      const step = (item?.offsetWidth || track.clientWidth) + parseFloat(getComputedStyle(track).gap || '0');
      setSlider({ index: Math.round(track.scrollLeft / step), atStart: track.scrollLeft < 2, atEnd: track.scrollLeft + track.clientWidth >= track.scrollWidth - 2 });
    };
    const observer = new ResizeObserver(update);
    observer.observe(track);
    track.addEventListener('scroll', update, { passive: true });
    update();
    return () => { observer.disconnect(); track.removeEventListener('scroll', update); };
  }, []);

  const moveSlider = (direction: number) => {
    const track = sliderRef.current;
    if (!track) return;
    const item = track.querySelector<HTMLElement>('.slider-item');
    const step = (item?.offsetWidth || track.clientWidth) + parseFloat(getComputedStyle(track).gap || '0');
    track.scrollBy({ left: direction * step, behavior: reduce ? 'auto' : 'smooth' });
  };
  const changeTab = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % capabilities.length;
    else if (event.key === 'ArrowLeft') next = (index + capabilities.length - 1) % capabilities.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = capabilities.length - 1;
    else return;
    event.preventDefault(); setActiveService(next); tabsRef.current[next]?.focus();
  };

  return (
    <div className="studio-home">
      <Seo title="Every Frame, Elevated" description="FrameX Studio. Video editing, photo retouching, color grading and sound finishing for brands and creators. Every frame, elevated." />
      <section className="home-hero" ref={heroRef} aria-labelledby="home-title">
        <div className="hero-art" aria-hidden="true"><motion.div className="hero-art-motion" style={reduce ? undefined : { y: imageY }}><img src="/media/midnight-drive.jpg" alt="" loading="eager" decoding="async" /></motion.div></div>
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-frame-corners" aria-hidden="true" />
        <div className="hero-copy">
          <motion.div initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, ease: [.22, 1, .36, 1] }}>
            <p className="eyebrow">FrameX Studio <span>/</span> In post. In detail.</p>
            <h1 id="home-title">The difference<br />is in <em>the edit.</em></h1>
            <p className="hero-description">Video editing. Photo retouching. Color & sound.<br />We turn what you capture into what they remember.</p>
            <div className="hero-actions"><Link to="/contact" className="button">Start a project <ArrowUpRight aria-hidden="true" /></Link><Link to="/work" className="button button-outline">Explore work <ArrowUpRight aria-hidden="true" /></Link></div>
            <div className="hero-disciplines" aria-label="Our disciplines"><span>01 / Motion</span><span>02 / Stills</span><span>03 / Finish</span></div>
          </motion.div>
        </div>
        <motion.div className="finishing-suite" initial={reduce ? false : { opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .15, ease: [.22, 1, .36, 1] }}>
          <div className="suite-toolbar"><span><i /> FrameX / Finishing suite</span><span className="suite-tool-label">Look development</span></div>
          <Link to="/work/midnight-drive" className="suite-viewer" aria-label="Explore Midnight Drive concept study">
            <img src="/media/midnight-drive.jpg" alt="Automotive reference image with cinematic lighting" loading="eager" />
            <div className="suite-grade" aria-hidden="true" />
            <span className="viewer-corner top-left" aria-hidden="true" /><span className="viewer-corner bottom-right" aria-hidden="true" />
            <span className="viewer-label">FX—01 <span>Midnight Drive</span></span>
            <span className="viewer-open"><ArrowUpRight aria-hidden="true" /></span>
          </Link>
          <div className="suite-timeline" aria-hidden="true">
            <div className="timeline-ruler"><span>00:00</span><span>00:08</span><span>00:16</span><span>00:24</span></div>
            <div className="timeline-track"><span>V1</span><div className="clip-lane"><i /><i /><i /><i /></div></div>
            <div className="timeline-track audio"><span>A1</span><div className="audio-lane">{Array.from({ length: 44 }, (_, index) => <i key={index} style={{ height: `${8 + ((index * 17) % 23)}px` }} />)}</div></div>
            <div className="timeline-playhead" />
          </div>
          <div className="suite-status"><span>Picture <Check aria-hidden="true" /> Color <Check aria-hidden="true" /> Sound <Check aria-hidden="true" /></span><span>Concept preview</span></div>
        </motion.div>
        <div className="hero-bottom-bar"><a href="#selected-work" className="hero-scroll">Explore the frames <ArrowDown aria-hidden="true" /></a><span className="hero-signature">Captured by you. <span>Elevated by FrameX.</span></span></div>
      </section>

      <section className="home-work section" id="selected-work" aria-labelledby="selected-title">
        <Reveal className="section-top"><div><p className="eyebrow">Highlighted projects / Selected frames</p><h2 id="selected-title">The craft, in focus.</h2></div><Link className="button button-outline" to="/work">View all work <ArrowUpRight aria-hidden="true" /></Link></Reveal>
        <div className="slider-toolbar"><p className="collection-note">Concept studies in motion and photography. Not client commissions.</p><div className="slider-controls"><span className="slider-counter" aria-live="polite" aria-atomic="true">{String(slider.index + 1).padStart(2, '0')} <span>/ {String(featured.length).padStart(2, '0')}</span></span><button type="button" className="slider-button" aria-label="Previous projects" aria-controls="project-slider" disabled={slider.atStart} onClick={() => moveSlider(-1)}><ArrowLeft aria-hidden="true" /></button><button type="button" className="slider-button" aria-label="Next projects" aria-controls="project-slider" disabled={slider.atEnd} onClick={() => moveSlider(1)}><ArrowRight aria-hidden="true" /></button></div></div>
        <div className="home-projects" id="project-slider" ref={sliderRef} role="region" aria-roledescription="carousel" aria-label="Highlighted project concepts. Use left and right arrow keys to browse." tabIndex={0} onKeyDown={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); moveSlider(event.key === 'ArrowLeft' ? -1 : 1); } }}>
          {featured.map((project, index) => <div className="slider-item" key={project.id} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${featured.length}`}><ProjectCard project={project} index={index} /><span className="slide-index" aria-hidden="true">FX / {String(index + 1).padStart(2, '0')}</span></div>)}
        </div>
        <div className="slider-footnote"><span>Swipe, scroll, or use the arrows.</span><span>Motion & stills / FrameX collection</span></div>
      </section>

      <section className="home-services section" aria-labelledby="capabilities-title">
        <Reveal className="section-top"><div><p className="eyebrow">What we do / Post-production</p><h2 id="capabilities-title">Beyond the raw material.</h2></div><Link className="text-link" to="/services">Explore services <ArrowUpRight aria-hidden="true" /></Link></Reveal>
        <Reveal className="capability-console">
          <div className="capability-tabs" role="tablist" aria-label="Post-production services">{capabilities.map((item, index) => <button key={item.label} ref={element => { tabsRef.current[index] = element; }} id={`service-tab-${index}`} role="tab" type="button" aria-selected={activeService === index} aria-controls="service-panel" tabIndex={activeService === index ? 0 : -1} onClick={() => setActiveService(index)} onKeyDown={event => changeTab(event, index)}><span>0{index + 1}</span>{item.label}<ArrowUpRight aria-hidden="true" /></button>)}</div>
          <div className="capability-panel" id="service-panel" role="tabpanel" aria-labelledby={`service-tab-${activeService}`} tabIndex={0}>
            <div className={`capability-visual service-visual-${activeService}`}><img src={capability.image} alt="" loading="lazy" key={capability.image} /><div className="visual-viewfinder" aria-hidden="true" /><span className="visual-caption">{capability.imageLabel}<small>Reference visual / Concept preview</small></span><span className="visual-frame-mark" aria-hidden="true">[ FX ]</span></div>
            <div className="capability-copy" key={capability.code}><p className="eyebrow">{capability.code}</p><h3>{capability.title.split('\n').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h3><p>{capability.copy}</p><ul>{capability.detail.map(item => <li key={item}>{item}</li>)}</ul><div className="capability-delivery"><span>Delivery path</span><p>{capability.finish}</p></div><Link to={`/contact?service=${encodeURIComponent(capability.service)}`} className="button button-outline">Discuss your {activeService === 1 ? 'images' : 'project'} <ArrowUpRight aria-hidden="true" /></Link></div>
          </div>
        </Reveal>
      </section>

      <section className="home-process section" aria-labelledby="process-title">
        <Reveal className="section-top"><div><p className="eyebrow">A simple process / A clear handoff</p><h2 id="process-title">A good edit starts<br />with a good connection.</h2></div><Link to="/team" className="text-link">Meet the two-person team <ArrowUpRight aria-hidden="true" /></Link></Reveal>
        <div className="process-sequence">{steps.map(({ icon: Icon, ...step }, index) => <Reveal className="process-stage" key={step.title}><div className="process-rail"><span>0{index + 1}</span><i /><Icon aria-hidden="true" /></div><h3>{step.title}</h3><p>{step.copy}</p><span className="process-tag">{step.tag}</span></Reveal>)}</div>
        <Reveal className="process-handoff"><span><i /> Direct creative work. Clear client coordination.</span><Link to="/contact" className="text-link">Let’s discuss your brief <ArrowUpRight aria-hidden="true" /></Link></Reveal>
      </section>
      <Testimonials records={clientTestimonials} sampleRecords={sampleTestimonials} />
      <CTA />
    </div>
  );
}
