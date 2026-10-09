import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/common/Seo';
import { CTA } from '../components/common/CTA';
import { Reveal } from '../components/common/Reveal';
import { team } from '../data/team';

export default function TeamPage() {
  return <>
    <Seo title="Our Team" description="The creative and operations core behind FrameX Studio." />
    <div className="studio-team">
      <section className="editorial-hero team-hero">
        <Reveal className="editorial-hero-heading"><p className="eyebrow">OUR TEAM</p><h1>Creative focus.<br /><em>Human connection.</em></h1></Reveal>
        <Reveal className="editorial-hero-copy"><p>Two core roles, working closely. Direct creative attention and a clear point of contact from brief to delivery.</p><Link className="button" to="/contact">Start a project <ArrowUpRight aria-hidden="true" /></Link></Reveal>
      </section>
      <section className="team-grid section" aria-label="Our two core team profiles">{team.map((member, index) => {
        const isPreview = /^\[.*\]$/.test(member.name);
        const title = isPreview ? (index === 0 ? 'Creative lead' : 'Operations lead') : member.name;
        return <Reveal className="team-card" key={member.role}>
          <div className="team-image"><img src={member.image} alt={isPreview ? 'Preview portrait for the ' + title.toLowerCase() + ' profile' : member.name + ', ' + member.role} loading="lazy" />{isPreview && <span>Profile preview</span>}</div>
          <div className="team-profile-copy"><p className="team-role">{member.role}</p><h2>{title}</h2><p>{member.bio}</p><ul>{member.responsibilities.slice(0, 3).map(item => <li key={item}>{item}</li>)}</ul>{isPreview && <p className="profile-preview-note">Name and portrait to be confirmed.</p>}</div>
        </Reveal>;
      })}</section>
      <section className="team-bridge-note" aria-labelledby="team-bridge-heading"><Reveal><h2 id="team-bridge-heading">One vision.<br />Two core strengths.</h2></Reveal><Reveal><p>Creative direction and clear coordination, together. Our operations lead connects your brief, feedback, and delivery with the creative process.</p></Reveal></section>
    </div>
    <CTA />
  </>;
}
