import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work, FAQ, Contact } from "@/types";
import { Line, Logo, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Kardan",
  lastName: "Dev",
  name: "kardan.dev",
  role: "Independent Software Studio",
  avatar: "/images/logo.jpg",
  email: "contact@kardan.dev",
  location: "America/Sao_Paulo",
  languages: ["English", "Portuguese"],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to updates from {person.name}</>,
  description: <>Short, practical notes on websites, apps, and digital growth for business owners.</>,
};

const contact: Contact = {
  title: "Let’s talk about your project",
  description: "Share a few details and I’ll reply within one business day with next steps.",
  labels: {
    clientName: "Full name",
    companyName: "Company name",
    industry: "Industry",
    isCompany: "I’m contacting on behalf of a company",
    serviceType: "What do you need?",
  },
};

const social: Social = [
  { name: "Email", icon: "email", link: `mailto:${person.email}` },
  { name: "Instagram", icon: "instagram", link: "dannyk-dev" },
  { name: "Facebook", icon: "facebook", link: "facebook" },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} — Independent Software Studio`,
  description:
    "A Brazil-based studio helping founders and teams launch clear, effective software: business websites, online stores, and custom web apps. Right-sized delivery with a single point of contact.",
  headline: <>Tech that move your business forward</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">kardan.dev</strong>
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">Featured Project</Text>
      </Row>
    ),
    href: "/work/our-saas-products",
  },
  subline: (
    <>
      Work directly with an independent developer. When a project needs extra hands, I scale with a
      trusted network. Clear scope, fixed timelines, measurable outcomes—without agency overhead.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `How ${person.name} plans, builds, and supports modern websites and applications with a flexible, on-demand team model.`,
  tableOfContent: { display: true, subItems: false },
  avatar: { display: true },
  calendar: { display: true, link: "https://cal.com/kardan" },
  intro: {
    display: true,
    title: "Who I work with",
    description: (
      <>
        I help small and mid-sized businesses, founders, and marketing teams turn ideas into working
        software. The studio is lean by design: simple projects are delivered directly; larger
        initiatives add specialist support where it matters. You get senior attention, clear
        communication, and a result that serves the business—not the other way around.
      </>
    ),
  },
  work: {
    display: true,
    title: "Experience",
    experiences: [
      {
        company: "kardan.dev",
        timeframe: "2022 – Present",
        role: "Independent Software Studio",
        achievements: [
          "Launched and maintained SaaS products used across multiple industries.",
          "Delivered corporate websites, online stores, and internal web tools with measurable business results.",
          "Scaled delivery through a vetted network of designers and developers when projects required it.",
        ],
        images: [
          { src: "/images/projects/saas-product.jpg", alt: "SaaS product interface", width: 16, height: 9 },
        ],
      },
    ],
  },
  studies: { display: false, title: "Studies", institutions: [] },
  technical: {
    display: true,
    title: "Services",
    skills: [
      {
        title: "Business Websites & Landing Pages",
        description: <>Clear messaging, fast load times, and thoughtful design aimed at inquiries and sales.</>,
        tags: [{ name: "Next.js", icon: "nextjs" }, { name: "Vercel", icon: "vercel" }],
        images: [],
      },
      {
        title: "Online Stores",
        description: <>Custom storefronts with secure payments, smooth checkout, and practical operations support.</>,
        tags: [{ name: "Shopify", icon: "shopify" }, { name: "Stripe", icon: "stripe" }],
        images: [],
      },
      {
        title: "Custom Web Applications",
        description: <>Internal tools, portals, and SaaS—built around your process and goals, not templates.</>,
        tags: [{ name: "Supabase", icon: "supabase" }, { name: "React", icon: "react" }],
        images: [],
      },
      {
        title: "Extended Services",
        description: <>Through partners: branding, design, social media, and consulting to support your launch and growth.</>,
        tags: [{ name: "Branding" }, { name: "Consulting" }, { name: "Marketing" }],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Ideas on digital growth",
  description: `Plain-language insights from ${person.name} on launching websites and apps, improving performance, and turning traffic into results.`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Case Studies – ${person.name}`,
  description: `Selected projects and outcomes—from quick wins to multi-phase builds.`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Visual Showcase – ${person.name}`,
  description: "A look at interfaces and brand moments from recent projects.",
  images: [
    { src: "/images/gallery/horizontal-1.jpg", alt: "image", orientation: "horizontal" },
    { src: "/images/gallery/vertical-4.jpg", alt: "image", orientation: "vertical" },
    { src: "/images/gallery/horizontal-3.jpg", alt: "image", orientation: "horizontal" },
    { src: "/images/gallery/vertical-1.jpg", alt: "image", orientation: "vertical" },
  ],
};

const faq: FAQ = {
  path: "/faq",
  label: "FAQ",
  title: `Frequently Asked Questions`,
  description: `Straight answers about scope, timing, and collaboration.`,
  questions: [
    {
      question: "Who will I work with?",
      answer:
        "You work directly with me. If a project needs extra capacity, I bring in trusted specialists and remain your single point of contact.",
    },
    {
      question: "How do projects start?",
      answer:
        "We begin with a short call to clarify goals and constraints. I propose a clear scope, timeline, and price so you can decide quickly.",
    },
    {
      question: "What do you deliver?",
      answer:
        "Websites that convert, online stores that sell, and web applications that simplify operations. We measure success by business outcomes.",
    },
    {
      question: "Do you work with clients outside Brazil?",
      answer:
        "Yes. Most work is remote with structured communication and regular check-ins across time zones.",
    },
    {
      question: "Can you support after launch?",
      answer:
        "Yes. I offer ongoing improvements, content and product updates, and performance reviews to keep results moving in the right direction.",
    },
    {
      question: "How do we get started?",
      answer:
        "Email contact@kardan.dev or book a call. After a short conversation, I’ll send a simple plan and next steps.",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery, faq, contact };
