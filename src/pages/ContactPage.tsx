import { zodResolver } from '@hookform/resolvers/zod';
import { useReducedMotion } from 'framer-motion';
import { ArrowUpRight, LoaderCircle, Mail, Plus } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { Reveal } from '../components/common/Reveal';
import { Seo } from '../components/common/Seo';
import { siteConfig } from '../config/site';

const serviceOptions = ['Video editing', 'Photo retouching', 'Short-form content', 'Commercial editing', 'Color grading', 'Ongoing creative support'];

const schema = z.object({
  name: z.string().min(2, 'Please enter your name').max(100),
  email: z.string().email('Enter a valid email').max(200),
  service: z.string().min(1, 'Choose a service'),
  description: z.string().min(20, 'Tell us a little more about the project').max(5000),
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
  const reduceMotion = useReducedMotion();
  const initialService = serviceOptions.find(option => option.toLowerCase() === searchParams.get('service')?.toLowerCase()) || '';
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    shouldFocusError: false,
    defaultValues: { name: '', email: '', service: initialService, description: '', budget: '', deadline: '', reference: '', website: '' },
  });
  const hasPublicEmail = !!siteConfig.email && !siteConfig.email.endsWith('.example');
  const submit = async (data: FormData) => {
    setStatus(null);
    try {
      const response = await fetch(siteConfig.inquiryEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const body = await response.json().catch(() => null);
      if (!response.ok) throw new Error(body?.message || 'Your inquiry could not be sent. Please try again.');
      if (body?.message !== 'Inquiry sent.') throw new Error('Inquiry delivery is unavailable here. Your message has not been sent. Please try again later.');
      setStatus({ type: 'success', message: 'Your inquiry has been sent. We’ll review your brief and reply by email.' });
      reset(); setDetailsOpen(false);
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Something went wrong. Please try again.' });
    }
  };
  const field = (name: 'name' | 'email' | 'budget' | 'deadline' | 'reference', label: string, placeholder: string, required = false, type = 'text', autoComplete?: string) => <label><span>{label}{required && <i aria-hidden="true"> *</i>}</span><input type={type} placeholder={placeholder} autoComplete={autoComplete} {...register(name)} required={required} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? name + '-error' : undefined} />{errors[name] && <small id={name + '-error'} role="alert">{errors[name]?.message}</small>}</label>;

  return <>
    <Seo title="Start a Project" description="Share a short brief for your next video editing, photography, or creative post-production project." />
    <section className="contact-page">
      <Reveal className="contact-intro"><p className="eyebrow">START A PROJECT</p><h1>Let’s create<br /><em>together.</em></h1><p>Tell us what you’re making. We’ll help shape the next step.</p><p className="contact-next-step">We’ll review your brief and reply by email with scope, timing, and a quote.</p>{hasPublicEmail && <a className="contact-email" href={'mailto:' + siteConfig.email}><Mail aria-hidden="true" />{siteConfig.email}</a>}</Reveal>
      <Reveal className="contact-form-shell"><form className="contact-form" ref={formRef} onSubmit={handleSubmit(submit, invalid => {
        const firstError = (['name', 'email', 'service', 'description', 'budget', 'deadline', 'reference'] as const).find(key => invalid[key]);
        if (invalid.budget || invalid.deadline || invalid.reference) setDetailsOpen(true);
        if (firstError) window.requestAnimationFrame(() => {
          const input = formRef.current?.querySelector<HTMLElement>('[name="' + firstError + '"]');
          input?.focus({ preventScroll: true });
          input?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
        });
      })} noValidate>
        <div className="contact-form-heading"><h2>Your brief</h2><p>Required fields marked <span aria-hidden="true">*</span></p></div>
        <div className="form-grid">{field('name', 'Full name', 'Your name', true, 'text', 'name')}{field('email', 'Email address', 'you@company.com', true, 'email', 'email')}</div>
        <label className="full-field"><span>Service<i aria-hidden="true"> *</i></span><select {...register('service')} required aria-invalid={!!errors.service} aria-describedby={errors.service ? 'service-error' : undefined}><option value="" disabled>Select a service</option>{serviceOptions.map(option => <option key={option}>{option}</option>)}</select>{errors.service && <small id="service-error" role="alert">{errors.service.message}</small>}</label>
        <label className="full-field"><span>Project description<i aria-hidden="true"> *</i></span><textarea rows={4} placeholder="What are you creating, and what should it achieve?" {...register('description')} required aria-invalid={!!errors.description} aria-describedby={errors.description ? 'description-error' : undefined} />{errors.description && <small id="description-error" role="alert">{errors.description.message}</small>}</label>
        <details className="contact-extra" open={detailsOpen} onToggle={event => setDetailsOpen(event.currentTarget.open)}><summary><span>Add details <small>Optional</small></span><Plus aria-hidden="true" /></summary><div className="form-grid">{field('budget', 'Budget', 'e.g. $500–$1,000')}{field('deadline', 'Deadline', '', false, 'date')}<div className="reference-field">{field('reference', 'Reference link', 'https://', false, 'url')}</div></div></details>
        <input className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" aria-label="Leave this field empty" {...register('website')} />
        <div className="form-footer"><button className="button" type="submit" disabled={isSubmitting}>{isSubmitting ? <><LoaderCircle className="spin" aria-hidden="true" /> Sending</> : <>Send inquiry <ArrowUpRight aria-hidden="true" /></>}</button><p>By sending, you agree to our <Link to="/privacy">Privacy Policy</Link>.</p></div>
        {status && <div className={'form-status ' + status.type} role={status.type === 'error' ? 'alert' : 'status'}>{status.message}</div>}
      </form></Reveal>
    </section>
  </>;
}
