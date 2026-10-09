import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/common/Seo';
import { CTA } from '../components/common/CTA';
import { Reveal } from '../components/common/Reveal';
import { team } from '../data/team';

export default function TeamPage() {
  return <>
    <Seo title="Our Team" description="Meet the two-person creative and operations core behind FrameX Studio." />
    <div className="studio-team">
      <section className="page-hero editorial-hero team-hero"><p className="eyebrow">THE PEOPLE</p><h1>Creative focus.<br /><em>Human connection.</em></h1><div className="editorial-hero-copy"><p>Two core roles. One connected workflow. Direct creative attention and a clear point of contact from brief to delivery.</p><Link className="text-link" to="/contact">Start a conversation <ArrowUpRight /></Link></div></section>
      <section className="team-grid section" aria-label="Our two core team profiles">{team.map((member, index) => {
        const isPreview = /^\[.*\]$/.test(member.name);
        const title = isPreview ? (index === 0 ? 'Creative lead' : 'Operations lead') : member.name;
        return <Reveal className="team-card" key={member.role}><div className="team-image"><img src={member.image} alt={isPreview ? `Preview portrait for the ${title.toLowerCase()} profile` : `${member.name}, ${member.role}`} loading="lazy" /><span>{isPreview ? 'PROFILE PREVIEW' : `0${index + 1} / FRAMEX STUDIO`}</span></div><div className="team-profile-copy"><p className="eyebrow">{member.role}</p><h2>{title}</h2><p>{member.bio}</p><ul>{member.responsibilities.map(item => <li key={item}>{item}</li>)}</ul>{isPreview && <p className="profile-preview-note">Profile name and portrait to be confirmed.</p>}</div></Reveal>;
      })}</section>
      <section className="team-workflow"><div><p className="eyebrow">A CONNECTED PROCESS</p><h2>Clear brief.<br />Considered execution.</h2></div><div><p>Your operations lead handles scope, feedback, and delivery. Your creative lead shapes the edit, color, and finish.</p><p>Fewer handoffs. A shared understanding of what the work needs to do.</p><Link className="text-link" to="/contact">Tell us what you’re making <ArrowUpRight /></Link></div></section>
    </div>
    <CTA />
  </>;
}
