import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/common/Seo';
import { CTA } from '../components/common/CTA';
import { Reveal } from '../components/common/Reveal';
import { team } from '../data/team';

export default function TeamPage() {
  return <>
    <Seo title="Our Team" description="Meet the two-person creative and operations core behind FrameX Studio." />
    <section className="page-hero team-hero"><p className="eyebrow">THE PEOPLE / TWO CORE STRENGTHS</p><h1>Creative focus.<br /><em>Human connection.</em></h1><p>A compact team built around two things clients need most: strong creative execution and clear project coordination.</p></section>
    <section className="team-grid section">{team.map((member, index) => <Reveal className="team-card" key={member.role}><div className="team-image"><img src={member.image} alt={`${member.name}, ${member.role}`} /><span>0{index + 1} / FRAMEX STUDIO</span></div><p className="eyebrow">{member.role}</p><h2>{member.name}</h2><p>{member.bio}</p><ul>{member.responsibilities.map(item => <li key={item}>{item}</li>)}</ul></Reveal>)}</section>
    <section className="team-bridge section"><Reveal><p className="eyebrow">HOW WE WORK TOGETHER</p><h2>One vision.<br />Two core strengths.</h2></Reveal><Reveal><p>The operations lead is the bridge between every client conversation and the creative production process—keeping requirements clear, feedback moving, and delivery organized.</p><p>The creative lead turns that clarity into focused visual work. The result is a smaller team with fewer handoffs and a more connected experience.</p><Link className="text-link" to="/contact">Start the conversation <ArrowUpRight /></Link></Reveal></section>
    <CTA />
  </>;
}
