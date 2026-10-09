import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CTA } from '../components/common/CTA';
import { Reveal } from '../components/common/Reveal';
import { Seo } from '../components/common/Seo';

export default function AboutPage() {
  return <>
    <Seo title="About" description="FrameX Studio combines visual creativity with a clear, structured post-production workflow." />
    <section className="page-hero about-hero"><p className="eyebrow">ABOUT FRAMEX / STUDIO NOTES</p><h1>Behind every great frame<br />is a <em>better vision.</em></h1></section>
    <section className="about-statement section"><Reveal><p className="eyebrow">OUR POINT OF VIEW</p><h2>Polish is not the point.<br /><span>Meaning is.</span></h2></Reveal><Reveal><p>We believe post-production should reveal the strongest version of an idea—not bury it under technique.</p><p>FrameX combines creative judgment with organized coordination, so clients get both a stronger visual outcome and a smoother way to reach it.</p></Reveal></section>
    <section className="about-image"><img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2200&q=88" alt="Film production set" /><span>CREATIVE POST-PRODUCTION — 2026</span></section>
    <section className="principles section"><Reveal><p className="eyebrow">WHAT GUIDES US</p><h2>Three simple principles.</h2></Reveal><div><Reveal><span>01</span><h3>Clarity before complexity.</h3><p>A clear idea beats an overworked one. Every choice should earn its place.</p></Reveal><Reveal><span>02</span><h3>Details create the feeling.</h3><p>Timing, texture, tone, and sound add up to the experience people remember.</p></Reveal><Reveal><span>03</span><h3>Process shapes the work.</h3><p>Good communication protects the creative and keeps momentum intact.</p></Reveal></div></section>
    <section className="audience section"><p className="eyebrow">WHO WE WORK WITH</p><div><span>Creators</span><span>Brands</span><span>Agencies</span><span>Startups</span><span>E-commerce</span><span>Real Estate</span></div></section>
    <section className="quote-strip"><div><p className="eyebrow">THE PEOPLE BEHIND THE PROCESS</p><h2>One vision. Two core strengths.</h2></div><Link className="button" to="/team">Meet the team <ArrowUpRight /></Link></section>
    <CTA />
  </>;
}
