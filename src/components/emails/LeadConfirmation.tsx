// emails/LeadConfirmation.tsx
import type React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Link,
} from "@react-email/components";

type LeadConfirmationProps = {
  clientName: string;
  email: string;
  isCompany: boolean;
  companyName?: string | null;
  industry: string;
  serviceType: string;
  otherService?: string | null;
  phone?: string;
  country?: string;
  state?: string;
  city?: string;
  message?: string;
  submittedAtISO?: string; // optional
  siteUrl?: string;        // e.g. https://www.kardan.dev
};

export default function LeadConfirmation(props: LeadConfirmationProps) {
  const {
    clientName,
    email,
    isCompany,
    companyName,
    industry,
    serviceType,
    otherService,
    phone,
    country,
    state,
    city,
    message,
    submittedAtISO,
    siteUrl = "https://www.kardan.dev",
  } = props;

  const submittedAt = submittedAtISO
    ? new Date(submittedAtISO).toLocaleString()
    : new Date().toLocaleString();

  return (
    <Html>
      <Head />
      <Preview>Thanks — we received your message. Here’s a copy.</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.h1}>Thanks, {clientName || "there"} — message received</Heading>
          <Text style={styles.muted}>
            We’ll review and reply within one business day. Below is a copy of what you sent.
          </Text>

          <Section style={styles.card}>
            <Heading as="h2" style={styles.h2}>Summary</Heading>
            <Text><strong>Submitted:</strong> {submittedAt}</Text>
            <Text><strong>Email:</strong> {email}</Text>
            {phone ? <Text><strong>Phone:</strong> {phone}</Text> : null}
            <Text><strong>Service:</strong> {serviceType}{serviceType === "Other" && otherService ? ` — ${otherService}` : ""}</Text>
            <Text><strong>Industry:</strong> {industry}</Text>
            <Text>
              <strong>Company:</strong> {isCompany ? (companyName || "—") : "Individual"}
            </Text>
            {(country || state || city) ? (
              <Text>
                <strong>Location:</strong> {[city, state, country].filter(Boolean).join(", ")}
              </Text>
            ) : null}
          </Section>

          {message ? (
            <Section style={styles.card}>
              <Heading as="h2" style={styles.h2}>Your message</Heading>
              <Text style={styles.pre}>{message}</Text>
            </Section>
          ) : null}

          <Section style={styles.footerCta}>
            <Text>
              Want to add details or files? Reply to this email or use the contact page:
              {" "}
              <Link href={`${siteUrl}/contact`} style={styles.link}>{siteUrl}/contact</Link>
            </Text>
          </Section>

          <Hr style={styles.hr} />
          <Text style={styles.footer}>
            Sent from <Link href={siteUrl} style={styles.link}>{siteUrl}</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: { backgroundColor: "#f6f8fb", margin: 0, padding: "24px 0", fontFamily: "ui-sans-serif, -apple-system, Segoe UI, Roboto, Helvetica, Arial" },
  container: { backgroundColor: "#ffffff", borderRadius: 12, padding: 24, margin: "0 auto", maxWidth: 560, border: "1px solid #e6e8ef" },
  h1: { margin: 0, marginBottom: 8, fontSize: 22, lineHeight: "28px" },
  h2: { margin: 0, marginBottom: 8, fontSize: 16, lineHeight: "22px" },
  muted: { color: "#6b7280", marginBottom: 16 },
  card: { backgroundColor: "#fafbff", border: "1px solid #eef1f7", borderRadius: 10, padding: 16, marginBottom: 12 },
  pre: { whiteSpace: "pre-wrap", lineHeight: "22px" },
  footerCta: { paddingTop: 8, paddingBottom: 8 },
  link: { color: "#2563eb", textDecoration: "underline" },
  hr: { borderColor: "#e6e8ef", marginTop: 16, marginBottom: 8 },
  footer: { color: "#6b7280", fontSize: 12 },
};
