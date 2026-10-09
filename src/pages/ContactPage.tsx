import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight, LoaderCircle, Mail, Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { Seo } from '../components/common/Seo';
import { siteConfig } from '../config/site';

const schema = z.object({
  name: z.string().min(2, 'Please enter your name').max(100),
  email: z.string().email('Enter a valid email'),
  company: z.string().max(120).optional(),
  service: z.string().min(1, 'Choose a service'),
  projectType: z.string().max(120).optional(),
  description: z.string().min(20, 'Tell us a little more about the project').max(5000),
  budget: z.string().optional(),
  deadline: z.string().optional(),
  reference: z.union([z.literal(''), z.string().url('Enter a complete URL')]).optional(),
  contactMethod: z.string().optional(),
  website: z.string().max(0).optional(),
});
type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const hasPublicEmail = !!siteConfig.email && !siteConfig.email.endsWith('.example');
  const submit = async (data: FormData) => {
    setStatus(null);
    try {
      const response = await fetch(siteConfig.inquiryEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.message || 'Your inquiry could not be sent.');
      setStatus({ type: 'success', message: 'Thanks — your brief is with us. We’ll review it and reply to the email provided.' }); reset(); setDetailsOpen(false);
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Something went wrong. Please try again.' });
    }
  };
  const field = (name: keyof FormData, label: string, required = false, type = 'text', autoComplete?: string) => <label><span>{label}{required && <i aria-hidden="true"> *</i>}</span><input type={type} autoComplete={autoComplete} {...register(name)} required={required} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-error` : undefined} />{errors[name] && <small id={`${name}-error`} role="alert">{errors[name]?.message}</small>}</label>;
  return <>
    <Seo title="Start a Project" description="Tell FrameX Studio about your video editing, photo retouching, or creative post-production project." />
    <section className="contact-page">
      <div className="contact-intro"><p className="eyebrow">LET’S TALK</p><h1>Let’s create something<br /><em>exceptional.</em></h1><p>A new campaign. A sharper edit. A creative partner for the long run. Tell us what you have in mind.</p>{hasPublicEmail && <a className="contact-email" href={`mailto:${siteConfig.email}`}><Mail aria-hidden="true" />{siteConfig.email}</a>}<div className="contact-note"><span>A clear next step</span><p>We’ll review your brief and reply by email to discuss the scope, timing, and quote.</p><div className="contact-disciplines"><span>Video</span><span>Photo</span><span>Ongoing support</span></div></div></div>
      <form className="contact-form" onSubmit={handleSubmit(submit, invalid => { if (invalid.reference || invalid.company || invalid.projectType) setDetailsOpen(true); })} noValidate>
        <div className="contact-form-heading"><h2>Your project starts here.</h2><p>Four essentials. We’ll work out the details together.</p></div>
        <div className="form-grid">{field('name', 'Full name', true, 'text', 'name')}{field('email', 'Email address', true, 'email', 'email')}</div>
        <label className="full-field"><span>What can we help with?<i aria-hidden="true"> *</i></span><select {...register('service')} defaultValue="" required aria-invalid={!!errors.service} aria-describedby={errors.service ? 'service-error' : undefined}><option value="" disabled>Select a service</option><option>Video editing</option><option>Photo retouching</option><option>Short-form content</option><option>Commercial editing</option><option>Color grading</option><option>Ongoing creative support</option></select>{errors.service && <small id="service-error" role="alert">{errors.service.message}</small>}</label>
        <label className="full-field"><span>A little about your project<i aria-hidden="true"> *</i></span><textarea rows={4} placeholder="What are you making, who is it for, and what should it achieve?" {...register('description')} required aria-invalid={!!errors.description} aria-describedby={errors.description ? 'description-error' : undefined} />{errors.description && <small id="description-error" role="alert">{errors.description.message}</small>}</label>
        <details className="contact-extra" open={detailsOpen} onToggle={event => setDetailsOpen(event.currentTarget.open)}><summary><span>Add project details <small>Optional</small></span><Plus aria-hidden="true" /></summary><div className="form-grid">{field('company', 'Company / Brand', false, 'text', 'organization')}{field('projectType', 'Project type')}{field('budget', 'Estimated budget')}{field('deadline', 'Expected deadline', false, 'date')}{field('reference', 'Reference link', false, 'url')}<label><span>Preferred contact method</span><select {...register('contactMethod')} defaultValue="Email"><option>Email</option>{siteConfig.whatsapp && <option>WhatsApp</option>}<option>Video call</option></select></label></div></details>
        <input className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" aria-label="Leave this field empty" {...register('website')} />
        <div className="form-footer"><button className="button" type="submit" disabled={isSubmitting}>{isSubmitting ? <><LoaderCircle className="spin" aria-hidden="true" /> Sending</> : <>Send inquiry <ArrowUpRight aria-hidden="true" /></>}</button><p>By sending, you agree to our <Link to="/privacy">Privacy Policy</Link>.</p></div>
        {status && <div className={`form-status ${status.type}`} role="status">{status.message}</div>}
      </form>
    </section>
  </>;
}
