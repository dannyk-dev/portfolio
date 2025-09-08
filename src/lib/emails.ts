// lib/email.ts
import { Resend } from "resend";
import LeadConfirmation from "@/components/emails/LeadConfirmation";
import { render } from "@react-email/render";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const resend = new Resend(process.env.RESEND_API_KEY!);

const FROM = process.env.EMAIL_FROM || "Kardan Studio <no-reply@kardan.dev>";
const INTERNAL_NOTIFY = process.env.LEADS_NOTIFY_TO || "kruger.dkk@gmail.com";

type LeadPayload = {
  clientName: string;
  isCompany: boolean;
  companyName: string | null;
  industry: string;
  serviceType: string;
  otherService: string | null;
  phone: string;
  email: string;
  country: string;
  city: string;
  state: string;
  message: string;
  submittedAtISO?: string;
};

export async function sendLeadConfirmation(lead: LeadPayload) {
  const subject = `We received your message — ${lead.clientName || "Thanks"}`;
  const react = LeadConfirmation({
    clientName: lead.clientName,
    email: lead.email,
    isCompany: lead.isCompany,
    companyName: lead.companyName,
    industry: lead.industry,
    serviceType: lead.serviceType,
    otherService: lead.otherService || undefined,
    phone: lead.phone,
    country: lead.country,
    state: lead.state,
    city: lead.city,
    message: lead.message,
    submittedAtISO: lead.submittedAtISO || new Date().toISOString(),
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.kardan.dev",
  });

  const text = await render(react, { plainText: true });

  await resend.emails.send({
    from: FROM,
    to: lead.email,
    subject,
    react,
    text,
  });
}

export async function sendLeadNotification(lead: LeadPayload) {
  const subject = `New lead: ${lead.clientName} • ${lead.serviceType}`;
  const body =
    `Name: ${lead.clientName}\n` +
    `Email: ${lead.email}\n` +
    `Phone: ${lead.phone}\n` +
    `Company: ${lead.isCompany ? lead.companyName : "Individual"}\n` +
    `Service: ${lead.serviceType}${lead.serviceType === "Other" && lead.otherService ? ` — ${lead.otherService}` : ""}\n` +
    `Industry: ${lead.industry}\n` +
    `Location: ${[lead.city, lead.state, lead.country].filter(Boolean).join(", ")}\n\n` +
    `Message:\n${lead.message || "-"}`;

  await resend.emails.send({
    from: FROM,
    to: INTERNAL_NOTIFY,
    subject,
    text: body,
  });
}
