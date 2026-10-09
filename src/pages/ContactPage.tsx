import { zodResolver } from '@hookform/resolvers/zod';
import { useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, CheckCircle2, LoaderCircle, Mail, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { Reveal } from '../components/common/Reveal';
import { Seo } from '../components/common/Seo';
import { siteConfig } from '../config/site';

const serviceOptions = ['Video editing', 'Photo retouching', 'Short-form content', 'Commercial editing', 'Color grading', 'Ongoing creative support'];

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(100),
  email: z.string().trim().email('Enter a valid email').max(200),
  service: z.string().trim().min(1, 'Choose a service'),
  description: z.string().trim().min(20, 'Tell us a little more about the project').max(5000),
  budget: z.string().max(120).optional(),
  deadline: z.string().max(60).optional(),
  reference: z.union([z.literal(''), z.string().url('Enter a complete URL').max(500)]).optional(),
  website: z.string().max(0).optional(),
});
type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const initialService = serviceOptions.find(option => option.toLowerCase() === searchParams.get('service')?.toLowerCase()) || '';
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    shouldFocusError: false,
    defaultValues: { name: '', email: '', service: initialService, description: '', budget: '', deadline: '', reference: '', website: '' },
  });
  const hasPublicEmail = !!siteConfig.email && !siteConfig.email.endsWith('.example');
  useEffect(() => {
    if (!status) return;
    statusRef.current?.focus({ preventScroll: true });
    statusRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
  }, [status, reduceMotion]);
  const submit = async (data: FormData) => {
    setStatus(null);
    try {
      const response = await fetch(siteConfig.inquiryEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const body = await response.json().catch(() => null);
      if (!response.ok) throw new Error(body?.message || 'Your inquiry could not be sent. Please try again.');
      if (body?.message !== 'Inquiry sent.') throw new Error('Inquiry delivery is unavailable here. Your message has not been sent. Please try again later.');
      setStatus({ type: 'success', message: 'Your query has been submitted successfully. We’ll review your brief and reply by email with the next steps.' });
      reset(); setDetailsOpen(false);
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Something went wrong. Please try again.' });
    }
  };
  const field = (name: 'name' | 'email' | 'budget' | 'deadline' | 'reference', label: string, placeholder: string, required = false, type = 'text', autoComplete?: string) => <label><span>{label}{required && <i aria-hidden="true"> *</i>}</span><input type={type} placeholder={placeholder} autoComplete={autoComplete} {...register(name)} required={required} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? name + '-error' : undefined} />{errors[name] && <small id={name + '-error'} role="alert">{errors[name]?.message}</small>}</label>;

  return <>
    <Seo title="Start a Project" description="Share a short brief for your next video editing, photography, or creative post-production project." />
    <section className="contact-page">
      <Reveal className="contact-intro"><p className="eyebrow">FRAMEX / PROJECT INTAKE</p><h1>Good work starts<br /><em>with your brief.</em></h1><p>Share your footage, images, or idea. We’ll discuss the edit, delivery, and quote with you.</p><div className="contact-brand-frame"><img src="/media/creator-cuts.jpg" alt="Post-production workstation reference" loading="lazy" /><span className="contact-frame-label">Your material. Our attention to detail.</span><span className="contact-frame-code" aria-hidden="true">[ FX / IN POST ]</span></div><div className="contact-next-step"><span className="eyebrow">What happens next</span><p>Your client & operations lead reviews the brief, confirms the scope with your editor, and replies with timing and a quote.</p><div className="contact-route"><span><Check aria-hidden="true" /> Clear scope</span><span><Check aria-hidden="true" /> Agreed deliverables</span></div></div>{hasPublicEmail && <a className="contact-email" href={'mailto:' + siteConfig.email}><Mail aria-hidden="true" />{siteConfig.email}</a>}</Reveal>
      <Reveal className="contact-form-shell"><div className="contact-channel"><span><i /> Project inquiry</span><span>Editing / Retouching / Finishing</span></div><form className="contact-form" ref={formRef} onSubmit={handleSubmit(submit, invalid => {
        setStatus(null);
        const firstError = (['name', 'email', 'service', 'description', 'budget', 'deadline', 'reference'] as const).find(key => invalid[key]);
        if (invalid.budget || invalid.deadline || invalid.reference) setDetailsOpen(true);
        if (firstError) window.requestAnimationFrame(() => {
          const input = formRef.current?.querySelector<HTMLElement>('[name="' + firstError + '"]');
          input?.focus({ preventScroll: true });
          input?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
        });
      })} noValidate>
        <div className="contact-form-heading"><div><p className="eyebrow">01 / THE BASICS</p><h2>Your project brief</h2></div><p>Required fields marked <span aria-hidden="true">*</span></p></div>
        <div className="form-grid">{field('name', 'Full name', 'Your name', true, 'text', 'name')}{field('email', 'Email address', 'you@company.com', true, 'email', 'email')}</div>
        <label className="full-field"><span>Service<i aria-hidden="true"> *</i></span><select {...register('service')} required aria-invalid={!!errors.service} aria-describedby={errors.service ? 'service-error' : undefined}><option value="" disabled>Select a service</option>{serviceOptions.map(option => <option key={option}>{option}</option>)}</select>{errors.service && <small id="service-error" role="alert">{errors.service.message}</small>}</label>
        <label className="full-field"><span>Project description<i aria-hidden="true"> *</i></span><textarea rows={4} placeholder="What are you working on? Tell us about your material, the finish you want, and where it will be used." {...register('description')} required aria-invalid={!!errors.description} aria-describedby={errors.description ? 'description-error' : undefined} />{errors.description && <small id="description-error" role="alert">{errors.description.message}</small>}</label>
        <details className="contact-extra" open={detailsOpen} onToggle={event => setDetailsOpen(event.currentTarget.open)}><summary><span>Add details <small>Optional</small></span><Plus aria-hidden="true" /></summary><div className="form-grid">{field('budget', 'Budget', 'e.g. $500–$1,000')}{field('deadline', 'Deadline', '', false, 'date')}<div className="reference-field">{field('reference', 'Reference link', 'https://', false, 'url')}</div></div></details>
        <input className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" aria-label="Leave this field empty" {...register('website')} />
        <div className="form-footer"><button className="button" type="submit" disabled={isSubmitting}>{isSubmitting ? <><LoaderCircle className="spin" aria-hidden="true" /> Sending</> : <>Send inquiry <ArrowUpRight aria-hidden="true" /></>}</button><p>By sending, you agree to our <Link to="/privacy">Privacy Policy</Link>.</p></div>
        {status && <div className={'form-status ' + status.type} ref={statusRef} tabIndex={-1} role={status.type === 'error' ? 'alert' : 'status'}>{status.type === 'success' ? <><CheckCircle2 aria-hidden="true" /><div><h3>Brief received. Thank you.</h3><p>{status.message}</p></div></> : <><p>{status.message}</p><small>Your brief is still in the form. You can try again.</small></>}</div>}
      </form></Reveal>
    </section>
  </>;
}
