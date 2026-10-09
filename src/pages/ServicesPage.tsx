import { ArrowUpRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CTA } from '../components/common/CTA';
import { Reveal } from '../components/common/Reveal';
import { Seo } from '../components/common/Seo';
import { services } from '../data/services';

const groups = [
  { category: 'Video', number: '01', label: 'MOVING IMAGE', title: 'Give your footage a stronger story.', copy: 'The right cut. A cohesive grade. Sound that carries the feeling.', image: '/media/service-color-grading.jpg', alt: 'Post-production workstation with video and audio tracks' },
  { category: 'Photo', number: '02', label: 'STILL IMAGE', title: 'Every image, considered.', copy: 'Careful retouching, natural texture, and color that holds together.', image: '/media/service-photo-retouching.jpg', alt: 'Colorful editorial portrait reference' },
];
const waveform = [8, 14, 10, 22, 32, 18, 46, 34, 52, 26, 14, 30, 42, 58, 36, 20, 40, 26, 14, 24, 44, 30, 56, 38, 22, 48, 32, 18, 26, 12, 20, 10];
const support = services.find(service => service.category === 'Support')!;

export default function ServicesPage() {
  return <>
    <Seo title="Photo & Video Services" description="Focused video editing, photo retouching, color grading, sound finishing, and ongoing post-production support." />
    <div className="pp-services-page">
      <section className="pp-page-hero">
        <Reveal className="pp-page-heading"><p className="eyebrow">SERVICES / PHOTO + VIDEO</p><h1>Cut with purpose.<br /><em>Finish with feeling.</em></h1><p>Video editing, photo retouching, color, and sound. A considered finish for everything you’re ready to release.</p><Link className="button" to="/contact">Start a project <ArrowUpRight aria-hidden="true" /></Link></Reveal>
        <Reveal className="pp-editing-visual">
          <div className="pp-window-bar" aria-hidden="true"><span><i /> FRAMEX / POST-PRODUCTION</span><span>00:00:12:08</span></div>
          <div className="pp-editing-image"><img src="/media/service-video-editing.jpg" alt="Editing timeline with picture and audio tracks" loading="eager" /><span className="pp-frame-marker pp-marker-top" aria-hidden="true" /><span className="pp-frame-marker pp-marker-bottom" aria-hidden="true" /></div>
          <div className="pp-mini-timeline" aria-hidden="true"><span>V1</span><div className="pp-picture-track"><i /><i /><i /><i /></div><span>A1</span><div className="pp-audio-track"><svg viewBox="0 0 320 64" preserveAspectRatio="none">{waveform.map((height, index) => <rect key={index} x={index * 10 + 2} y={(64 - height) / 2} width="3" height={height} />)}</svg></div><div className="pp-playhead" /></div>
        </Reveal>
      </section>
      <section className="pp-service-catalog section" aria-label="Post-production services">
        <div className="pp-service-panels">{groups.map(group => <Reveal className={'pp-service-panel pp-' + group.category.toLowerCase() + '-panel'} key={group.category}>
          <div className="pp-service-cover"><img src={group.image} alt={group.alt} loading="lazy" /><span>{group.label}</span></div>
          <div className="pp-service-panel-copy"><p className="pp-index">{group.number} / {group.category.toUpperCase()}</p><h2>{group.title}</h2><p className="pp-service-benefit">{group.copy}</p>
            <div className="pp-service-options">{services.filter(service => service.category === group.category).map(service => <details className="pp-service-option" key={service.number}>
              <summary><h3>{service.title}</h3><Plus aria-hidden="true" /></summary>
              <div className="pp-service-option-body"><p>{service.description}</p><ul aria-label={service.title + ' deliverables'}>{service.deliverables.map(deliverable => <li key={deliverable}>{deliverable}</li>)}</ul><Link className="button button-outline" to={'/contact?service=' + encodeURIComponent(service.title)}>Discuss this service <ArrowUpRight aria-hidden="true" /></Link></div>
            </details>)}</div>
          </div>
        </Reveal>)}</div>
        <Reveal className="pp-support-panel">
          <div><p className="pp-index">03 / ONGOING SUPPORT</p><h2>{support.title}</h2><p>A dependable editing workflow for the content you make every month.</p><ul>{support.deliverables.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div className="pp-support-action"><svg className="pp-support-waveform" viewBox="0 0 320 64" aria-hidden="true">{waveform.map((height, index) => <rect key={index} x={index * 10 + 2} y={(64 - height) / 2} width="3" height={height} />)}</svg><Link className="button" to={'/contact?service=' + encodeURIComponent(support.title)}>Plan ongoing support <ArrowUpRight aria-hidden="true" /></Link></div>
        </Reveal>
      </section>
    </div>
    <CTA />
  </>;
}
