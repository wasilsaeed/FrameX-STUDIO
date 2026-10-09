import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/common/Seo';
import { CTA } from '../components/common/CTA';
import { Reveal } from '../components/common/Reveal';
import { team } from '../data/team';

const waveform = [12, 24, 16, 34, 46, 22, 54, 38, 20, 32, 48, 28, 58, 40, 22, 36, 50, 26, 42, 18, 30, 14, 24, 10];

function EditorRoleVisual() {
  return <div className="pp-team-role-visual pp-team-role-visual--editor" aria-hidden="true">
    <div className="pp-team-role-visual__bar"><span>PICTURE / COLOR / SOUND</span></div>
    <div className="pp-team-role-visual__viewer"><img src="/media/midnight-drive.jpg" alt="" loading="lazy" /></div>
    <div className="pp-team-role-visual__timeline"><span>V1</span><div className="pp-team-role-visual__clips"><i /><i /><i /></div><span>A1</span><svg viewBox="0 0 240 64" preserveAspectRatio="none">{waveform.map((height, index) => <rect key={index} x={index * 10 + 2} y={(64 - height) / 2} width="3" height={height} />)}</svg><i className="pp-team-role-visual__playhead" /></div>
  </div>;
}

function OperationsRoleVisual() {
  return <div className="pp-team-role-visual pp-team-role-visual--operations" aria-hidden="true">
    <div className="pp-team-role-visual__bar"><span>BRIEF / REVIEW / DELIVERY</span></div>
    <div className="pp-team-role-visual__handoff">{[['Brief', 'Scope + source files'], ['Review', 'Feedback + versions'], ['Delivery', 'Formats + handoff']].map(([title, detail], index) => <div className="pp-team-role-visual__stage" key={title}><span className="pp-team-role-visual__marker">0{index + 1}</span><div><span>{title}</span><small>{detail}</small></div></div>)}</div>
    <div className="pp-team-role-visual__footer"><span>CLIENT</span><i /><span>FRAMEX</span></div>
  </div>;
}

export default function TeamPage() {
  return <>
    <Seo title="Our Team" description="Meet the people behind FrameX Studio. Thoughtful photo and video post-production, supported by clear communication and considered delivery." />
    <div className="pp-team-page">
      <section className="pp-page-hero pp-team-hero">
        <Reveal className="pp-page-heading"><p className="eyebrow">THE TEAM / BEHIND THE CRAFT</p><h1>The people behind<br /><em>the finish.</em></h1></Reveal>
        <Reveal className="pp-team-intro"><p>Focused on your vision, from the first brief through the final export. Creative work and client coordination, aligned around your project.</p><Link className="button" to="/contact">Start a project <ArrowUpRight aria-hidden="true" /></Link></Reveal>
      </section>
      <section className="pp-team-grid section" aria-label="The people behind FrameX">{team.map((member, index) => <Reveal className="pp-team-profile" key={member.role}>
        {index === 0 ? <EditorRoleVisual /> : <OperationsRoleVisual />}
        <div className="pp-team-profile-copy"><p className="pp-index">{index === 0 ? 'CREATIVE' : 'CLIENT + OPERATIONS'}</p><h2>{member.role}</h2><p className="pp-team-bio">{member.bio}</p><ul>{member.responsibilities.map(item => <li key={item}>{item}</li>)}</ul></div>
      </Reveal>)}</section>
      <section className="pp-team-connection" aria-labelledby="team-connection-heading"><Reveal><h2 id="team-connection-heading">Creative craft.<br />Clear communication.</h2></Reveal><Reveal><p>A considered edit and a clear review process keep your vision in focus. From first cut to final handoff, every decision supports the work.</p><div className="pp-handoff" aria-label="Our collaborative workflow"><span>Brief</span><i aria-hidden="true" /><span>Edit</span><i aria-hidden="true" /><span>Review</span><i aria-hidden="true" /><span>Deliver</span></div></Reveal></section>
    </div>
    <CTA />
  </>;
}
