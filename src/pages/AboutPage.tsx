import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CTA } from '../components/common/CTA';
import { Reveal } from '../components/common/Reveal';
import { Seo } from '../components/common/Seo';

export default function AboutPage() {
  return <>
    <Seo title="About" description="FrameX Studio combines visual creativity with a clear, structured post-production workflow." />
    <div className="studio-about">
      <section className="page-hero editorial-hero about-hero"><p className="eyebrow">THE STUDIO</p><h1>Behind every great frame<br />is a <em>better vision.</em></h1><div className="editorial-hero-copy"><p>FrameX is a focused post-production studio. We turn footage and photography into work with a clear point of view.</p><Link className="text-link" to="/work">Explore our work <ArrowUpRight /></Link></div></section>
      <section className="studio-story section"><Reveal className="studio-story-image"><img src="/media/frame-by-frame.jpg" alt="Film camera and production equipment" loading="lazy" /><span>FRAMEX / CREATIVE POST-PRODUCTION</span></Reveal><Reveal className="studio-story-copy"><p className="eyebrow">OUR POINT OF VIEW</p><h2>An edit should bring<br />the idea into focus.</h2><p>We find the story in the footage. The balance in the color. The small details that make an image feel complete.</p><p>Creative judgment and clear coordination sit together here—so the process feels as considered as the finished work.</p><Link className="text-link" to="/team">Meet the people behind it <ArrowUpRight /></Link></Reveal></section>
      <section className="studio-principles section"><div className="studio-section-label"><p className="eyebrow">HOW WE THINK</p><h2>Considered at every step.</h2></div><div className="studio-principle-grid"><Reveal><span>01 / CLARITY</span><h3>Start with the story.</h3><p>Understand the idea, the audience, and what the work needs to achieve.</p></Reveal><Reveal><span>02 / CRAFT</span><h3>Make the details count.</h3><p>Pacing, texture, tone, and sound shape how the work feels.</p></Reveal><Reveal><span>03 / COLLABORATION</span><h3>Keep the process clear.</h3><p>A defined scope, considered feedback, and an organized delivery.</p></Reveal></div></section>
      <section className="studio-audience"><p className="eyebrow">OUR COLLABORATORS</p><p>Creators. Brands. Agencies.<br /><span>People with something worth showing.</span></p></section>
    </div>
    <CTA />
  </>;
}
