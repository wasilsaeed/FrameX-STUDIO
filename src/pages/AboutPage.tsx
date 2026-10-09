import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CTA } from '../components/common/CTA';
import { Reveal } from '../components/common/Reveal';
import { Seo } from '../components/common/Seo';

const principles = [
  ['Start with the story.', 'Know the idea, the audience, and what the work should achieve.'],
  ['Make every detail count.', 'Pacing, color, texture, and sound shape how the work feels.'],
  ['Keep the process clear.', 'A defined scope, focused feedback, and an organized delivery.'],
];

export default function AboutPage() {
  return <>
    <Seo title="About" description="A focused post-production studio bringing creative judgment and clear collaboration to video and photography." />
    <div className="studio-about">
      <section className="editorial-hero about-hero">
        <Reveal className="editorial-hero-heading"><p className="eyebrow">THE STUDIO</p><h1>A clearer<br /><em>creative vision.</em></h1></Reveal>
        <Reveal className="editorial-hero-copy"><p>A focused post-production studio for creators, brands, and agencies. Thoughtful craft, from the first brief to the final frame.</p><Link className="button" to="/contact">Start a project <ArrowUpRight aria-hidden="true" /></Link></Reveal>
      </section>
      <section className="studio-story section">
        <Reveal className="studio-story-image"><img src="/media/frame-by-frame.jpg" alt="Film camera and production equipment" loading="lazy" /></Reveal>
        <Reveal className="studio-story-copy"><p className="eyebrow">OUR POINT OF VIEW</p><h2>Bring the idea<br />into focus.</h2><p>We find the story in your footage and the balance in your images. Editing, color, and finishing come together to make the work feel complete.</p><p>With creative and operations working closely, you get direct attention and a clear path from brief to delivery.</p><Link className="button button-outline" to="/team">Meet the team <ArrowUpRight aria-hidden="true" /></Link></Reveal>
      </section>
      <section className="studio-principles section" aria-label="Our three principles"><div className="studio-principle-grid">{principles.map(([title, text], index) => <Reveal className="studio-principle" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div></section>
    </div>
    <CTA />
  </>;
}
