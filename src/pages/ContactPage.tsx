import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight, LoaderCircle, Mail } from 'lucide-react';
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
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const submit = async (data: FormData) => {
    setStatus(null);
    try {
      const response = await fetch(siteConfig.inquiryEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.message || 'Your inquiry could not be sent.');
      setStatus({ type: 'success', message: 'Thanks — your brief is with us. We’ll review it and reply to the email provided.' }); reset();
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Something went wrong. Please email us directly.' });
    }
  };
  const field = (name: keyof FormData, label: string, required = false, type = 'text') => <label><span>{label}{required && ' *'}</span><input type={type} {...register(name)} aria-invalid={!!errors[name]} />{errors[name] && <small role="alert">{errors[name]?.message}</small>}</label>;
  return <>
    <Seo title="Start a Project" description="Tell FrameX Studio about your video editing, photo retouching, or creative post-production project." />
    <section className="contact-page">
      <div className="contact-intro"><p className="eyebrow">START A PROJECT / NEW INQUIRY</p><h1>Let’s create something<br /><em>exceptional.</em></h1><p>Tell us what you’re working on. We’ll turn the moving parts into a clear next step.</p><a className="contact-email" href={`mailto:${siteConfig.email}`}><Mail />{siteConfig.email}</a><div className="contact-note"><span>What happens next</span><p>Your brief goes to our operations lead, who reviews the scope and gets back to you with the right questions.</p></div></div>
      <form className="contact-form" onSubmit={handleSubmit(submit)} noValidate>
        <div className="form-grid">{field('name', 'Full name', true)}{field('email', 'Email address', true, 'email')}{field('company', 'Company / Brand')}<label><span>Service required *</span><select {...register('service')} defaultValue=""><option value="" disabled>Select a service</option><option>Video editing</option><option>Photo retouching</option><option>Short-form content</option><option>Commercial editing</option><option>Color grading</option><option>Ongoing creative support</option></select>{errors.service && <small role="alert">{errors.service.message}</small>}</label>{field('projectType', 'Project type')}{field('budget', 'Estimated budget')}{field('deadline', 'Expected deadline', false, 'date')}{field('reference', 'Reference link', false, 'url')}</div>
        <label className="full-field"><span>Project description *</span><textarea rows={6} placeholder="What are you making, who is it for, and what should it achieve?" {...register('description')} aria-invalid={!!errors.description} />{errors.description && <small role="alert">{errors.description.message}</small>}</label>
        <label className="full-field"><span>Preferred contact method</span><select {...register('contactMethod')} defaultValue="Email"><option>Email</option><option>WhatsApp (if provided later)</option><option>Video call</option></select></label>
        <input className="honeypot" tabIndex={-1} autoComplete="off" {...register('website')} />
        <div className="form-footer"><p>By sending this form, you agree to our <Link to="/privacy">Privacy Policy</Link>.</p><button className="button" disabled={isSubmitting}>{isSubmitting ? <><LoaderCircle className="spin" /> Sending</> : <>Send inquiry <ArrowUpRight /></>}</button></div>
        {status && <div className={`form-status ${status.type}`} role="status">{status.message}</div>}
      </form>
    </section>
  </>;
}
