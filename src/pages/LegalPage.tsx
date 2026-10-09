import { Seo } from '../components/common/Seo';

export function PrivacyPage() {
  return <Legal title="Privacy Policy" updated="October 10, 2026"><h2>Information we receive</h2><p>When you submit a project inquiry, we receive the information you provide, such as your name, email, project description, and optional budget, deadline, or reference link.</p><h2>How it is used</h2><p>Inquiry information is used to review your request, communicate about the project, prepare a proposal, and maintain reasonable business records. We do not use the form as an unrestricted email relay.</p><h2>Service providers</h2><p>Website hosting and email delivery providers may process inquiry data on our behalf. Their use should be configured under appropriate business agreements before launch.</p><h2>Retention and requests</h2><p>Retention periods and a privacy contact for access, correction, or deletion requests must be confirmed and published before commercial launch.</p><p><strong>Launch note:</strong> This policy is a practical starter and should be reviewed for the laws and operating location that apply to the business.</p></Legal>;
}

export function TermsPage() {
  return <Legal title="Terms of Service" updated="October 10, 2026"><h2>Website information</h2><p>This website introduces FrameX Studio and provides a way to request project information. Portfolio pieces are illustrative concept studies, not claims of client engagement.</p><h2>Project engagements</h2><p>Submitting an inquiry does not create a service agreement. Scope, deliverables, fees, schedules, revisions, intellectual-property terms, and cancellation terms are confirmed in a separate written proposal or agreement.</p><h2>Website use</h2><p>You may not misuse the website, attempt to disrupt it, or submit unlawful, harmful, or misleading material through its forms.</p><h2>Final review</h2><p>These terms are a pre-launch starting point and require legal review for the business’s operating jurisdiction before commercial use.</p></Legal>;
}

function Legal({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return <><Seo title={title} description={`${title} for FrameX Studio.`} /><article className="legal-page"><header><p className="eyebrow">FRAMEX STUDIO / LEGAL</p><h1>{title}</h1><p>Last updated: {updated}</p></header><div>{children}</div></article></>;
}
